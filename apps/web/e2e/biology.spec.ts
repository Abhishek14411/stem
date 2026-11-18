import { test, expect } from '@playwright/test'

test('student opens Biology, explores all classes and returns to subjects', async ({ page }) => {
  await page.route('**/api/v1/tutor/biology/respond', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:4173',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        message: 'The nucleus contains genetic material.',
        hint: 'Find its label.',
        follow_up_question: 'What other structures do you see?',
        misconception_tag: null,
        status: 'ok',
      }),
    }),
  )
  await page.goto('/')
  await page.locator('.group-card').nth(1).click()
  await page.locator('.btn-primary').click()

  await expect(page.getByRole('heading', { name: 'Choose a subject' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Chemistry.*Available/ })).toBeEnabled()
  await expect(page.getByRole('button', { name: /Mathematics.*Available/ })).toBeEnabled()
  await expect(page.getByRole('button', { name: /Biology.*Available/ })).toBeEnabled()
  await expect(page.getByRole('button', { name: /Physics.*Available/ })).toBeEnabled()

  await page.getByRole('button', { name: /Biology.*Available/ }).click()
  const frame = page.locator('iframe[title="Biology Virtual Lab for Classes 6 to 8"]')
  await expect(frame).toHaveAttribute('src', '/biology/index.html')
  await expect(page.locator('.biology-module-host')).toHaveAttribute('data-loaded', 'true')
  await expect(page.locator('.biology-module-host__title')).toHaveText('Biology Virtual Lab')

  const lab = page.frameLocator('iframe.biology-module-host__frame')
  await expect(lab.locator('.topbar')).toBeHidden()
  await expect(lab.locator('.welcome p')).toBeVisible()
  await expect(lab.locator('.main-nav .nav-button')).toHaveCount(4)
  await expect
    .poll(() => lab.locator('body').evaluate((body) => getComputedStyle(body).backgroundColor))
    .toBe('rgb(251, 246, 234)')
  await expect
    .poll(() =>
      lab.locator('.grade-card').first().evaluate((card) => getComputedStyle(card).borderRadius),
    )
    .toBe('16px')

  await lab.locator('.main-nav .nav-button').nth(1).click()
  await expect(lab.getByRole('heading', { name: 'Class 6' })).toBeVisible()
  await expect(lab.locator('.topic-link')).toHaveCount(6)
  await lab.locator('.topic-link').first().click()
  await expect(lab.getByRole('heading', { name: 'The Wonderful World of Plants' })).toBeVisible()

  await lab.locator('.main-nav .nav-button').nth(2).click()
  await expect(lab.getByRole('heading', { name: 'Class 7' })).toBeVisible()
  await expect(lab.locator('.topic-link')).toHaveCount(6)
  await lab.locator('.topic-link').first().click()
  await expect(lab.getByRole('heading', { name: 'Nutrition in Plants' })).toBeVisible()

  await lab.locator('.main-nav .nav-button').nth(3).click()
  await expect(lab.getByRole('heading', { name: 'Class 8' })).toBeVisible()
  await expect(lab.locator('.topic-link')).toHaveCount(5)
  await lab.locator('.topic-link').first().click()
  await expect(lab.getByRole('heading', { name: 'The Cell' })).toBeVisible()

  const sparkInput = lab.locator('#biology-spark-question')
  await expect(sparkInput).toHaveAttribute('placeholder', 'What would you like to know about this topic?')
  await sparkInput.fill('What does the nucleus do?')
  const biologyRequest = page.waitForRequest((request) =>
    request.url().endsWith('/api/v1/tutor/biology/respond'),
  )
  await lab.getByRole('button', { name: 'Ask Spark' }).click()
  const request = await biologyRequest
  expect(request.postDataJSON()).toMatchObject({
    subject: 'biology',
    grade: 8,
    module_id: 'bio-cell',
    student_message: 'What does the nucleus do?',
  })
  await expect(lab.getByText('The nucleus contains genetic material.')).toBeVisible()

  await page.locator('.language-switch button').nth(1).click()
  await expect(page.locator('.biology-module-host__title')).toHaveText('जीव विज्ञान आभासी प्रयोगशाला')
  await expect(lab.getByRole('heading', { name: 'कोशिका' })).toBeVisible()
  await expect(lab.locator('#biology-spark-question')).toHaveAttribute('placeholder', 'इस पाठ के बारे में क्या जानना चाहते हैं?')
  await page.locator('.language-switch button').first().click()
  await expect(lab.locator('#biology-spark-question')).toHaveAttribute('placeholder', 'What would you like to know about this topic?')

  await page.setViewportSize({ width: 390, height: 844 })
  await lab.locator('.main-nav .nav-button').first().click()
  const frameWidth = await lab.locator('html').evaluate((html) => ({
    clientWidth: html.clientWidth,
    scrollWidth: html.scrollWidth,
  }))
  expect(frameWidth.scrollWidth).toBeLessThanOrEqual(frameWidth.clientWidth)

  await page.getByRole('button', { name: 'Back to Subjects' }).click()
  await expect(page.getByRole('heading', { name: 'Choose a subject' })).toBeVisible()
  await expect(page.locator('.subject-card')).toHaveCount(4)
})

test('Biology language changes preserve lesson and quiz state without reloading the iframe', async ({ page }) => {
  await page.goto('/')
  await page.locator('.group-card').nth(1).click()
  await page.locator('.btn-primary').click()
  await page.getByRole('button', { name: /Biology.*Available/ }).click()
  const lab = page.frameLocator('iframe.biology-module-host__frame')
  const frame = page.locator('iframe.biology-module-host__frame')
  await expect(frame).toHaveAttribute('src', '/biology/index.html')
  await lab.locator('.main-nav .nav-button').nth(3).click()
  await lab.locator('.topic-link').first().click()
  await lab.locator('[data-bio-prediction]').first().click()
  await lab.locator('#bio-submit-prediction').click()
  await lab.locator('[data-bio-key="zoom"]').selectOption('Nucleus')

  await page.locator('.language-switch button').nth(1).click()
  await expect(lab.getByRole('heading', { name: 'कोशिका' })).toBeVisible()
  await expect(lab.locator('html')).toHaveAttribute('lang', 'hi')
  await expect.poll(() => lab.locator('head title').evaluate((title) => title.textContent)).toBe('जीव विज्ञान आभासी प्रयोगशाला')
  await expect(lab.locator('.prediction-saved')).toContainText('अनुमान सहेजा गया')
  await expect(lab.locator('#bio-notice')).toContainText('केंद्रक')
  await expect(lab.locator('#lab-canvas')).toHaveAttribute('aria-label', /कोशिका/)
  await expect(lab.locator('#lab-canvas')).not.toHaveAttribute('aria-label', /\[\[MISSING:/)

  await lab.locator('#run-control').click()
  await expect(lab.locator('#run-control')).toContainText('रोकें')
  await expect(lab.locator('#run-status')).toHaveText('एनिमेशन चल रहा है')
  await lab.locator('#run-control').click()
  await expect(lab.locator('#run-control')).toContainText('चलाएँ')
  await expect(lab.locator('#run-status')).toHaveText('रुका हुआ · अन्वेषण के लिए तैयार')

  await lab.locator('#bio-topic-quiz').click()
  await expect(lab.locator('.quiz-box h3')).toContainText(/[\u0900-\u097f]/)
  await lab.locator('[data-option-role="correct"]').click()
  await expect(lab.locator('[data-option-role="correct"]')).toHaveClass(/correct/)
  await page.locator('.language-switch button').first().click()
  await expect(lab.locator('.quiz-box h3')).toContainText(/^[A-Za-z]/)
  await expect(lab.locator('[data-option-role="correct"]')).toHaveClass(/correct/)
  await expect(frame).toHaveAttribute('src', '/biology/index.html')

  await page.setViewportSize({ width: 390, height: 844 })
  const dimensions = await lab.locator('html').evaluate((html) => ({
    clientWidth: html.clientWidth,
    scrollWidth: html.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
})

test('all 17 Biology lesson canvases render without missing Hindi translations', async ({ page }) => {
  await page.addInitScript(() => {
    const original = CanvasRenderingContext2D.prototype.fillText
    CanvasRenderingContext2D.prototype.fillText = function (
      this: CanvasRenderingContext2D,
      ...args: Parameters<typeof original>
    ) {
      const label = args[0]
      const currentWindow = window as Window & { __biologyMissingCanvasLabels?: string[] }
      if (typeof label === 'string' && label.startsWith('[[MISSING:canvas.')) {
        currentWindow.__biologyMissingCanvasLabels ??= []
        currentWindow.__biologyMissingCanvasLabels.push(label)
      }
      return original.apply(this, args)
    }
  })

  await page.goto('/')
  await page.locator('.group-card').nth(1).click()
  await page.locator('.btn-primary').click()
  await page.getByRole('button', { name: /Biology.*Available/ }).click()
  const lab = page.frameLocator('iframe.biology-module-host__frame')
  await page.locator('.language-switch button').nth(1).click()

  for (const [gradeIndex, topicCount] of [6, 6, 5].entries()) {
    await lab.locator('.main-nav .nav-button').nth(gradeIndex + 1).click()
    for (let topicIndex = 0; topicIndex < topicCount; topicIndex++) {
      if (topicIndex > 0) await lab.locator('.topic-link').nth(topicIndex).click()
      await lab.locator('[data-bio-prediction]').first().click()
      await lab.locator('#bio-submit-prediction').click()
      await expect(lab.locator('#lab-canvas')).toBeVisible()
      const selectCount = await lab.locator('select[data-bio-key]').count()
      for (let selectIndex = 0; selectIndex < selectCount; selectIndex++) {
        const options = await lab.locator('select[data-bio-key]').nth(selectIndex).locator('option').evaluateAll((items) =>
          items.map((item) => (item as HTMLOptionElement).value),
        )
        for (const option of options) {
          await lab.locator('select[data-bio-key]').nth(selectIndex).selectOption(option)
        }
      }
      const toggles = lab.locator('input[type="checkbox"][data-bio-key]')
      for (let toggleIndex = 0; toggleIndex < await toggles.count(); toggleIndex++) {
        const toggle = toggles.nth(toggleIndex)
        await toggle.setChecked(!(await toggle.isChecked()))
        await toggle.setChecked(!(await toggle.isChecked()))
      }
    }
  }

  const missing = await lab.locator('body').evaluate((body) => {
    const currentWindow = body.ownerDocument.defaultView as (Window & { __biologyMissingCanvasLabels?: string[] }) | null
    return currentWindow?.__biologyMissingCanvasLabels ?? []
  })
  expect([...new Set(missing)]).toEqual([])
})
