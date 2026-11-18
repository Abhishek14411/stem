import { expect, test } from '@playwright/test'

async function openChemistry(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.locator('.group-card').nth(1).click()
  await page.locator('.btn-primary').click()
  await expect(page.getByRole('heading', { name: 'Choose a subject' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Chemistry.*Available/ })).toBeEnabled()
  await expect(page.getByRole('button', { name: /Mathematics.*Available/ })).toBeEnabled()
  await page.getByRole('button', { name: /Chemistry.*Available/ }).click()
  const frame = page.locator('iframe.chemistry-module-host__frame')
  await expect(frame).toHaveAttribute('src', '/chemistry/index.html')
  await expect(page.locator('.chemistry-module-host')).toHaveAttribute('data-loaded', 'true')
  return page.frameLocator('iframe.chemistry-module-host__frame')
}

test('Chemistry opens, preserves all class topics, and returns to subject selection', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  const lab = await openChemistry(page)
  await expect(page.locator('.chemistry-module-host__title')).toHaveText('Chemistry Virtual Lab')
  await expect(lab.locator('.brand')).toBeHidden()
  await expect(lab.locator('.topbar')).toBeHidden()
  await expect(lab.getByRole('heading', { name: 'Materials Around Us' })).toBeVisible()
  await expect.poll(() => lab.locator('body').evaluate((body) => getComputedStyle(body).backgroundColor))
    .toBe('rgb(251, 246, 234)')
  await expect.poll(() => lab.locator('.panel').first().evaluate((panel) => getComputedStyle(panel).borderRadius))
    .toBe('16px')

  const expectedTopics = [5, 3, 3]
  let total = 0
  for (const [classIndex, topicCount] of expectedTopics.entries()) {
    await lab.locator('#class-select').selectOption(String(classIndex + 6))
    const topics = lab.locator('.nav-item')
    await expect(topics).toHaveCount(topicCount)
    total += topicCount
    for (let topicIndex = 0; topicIndex < topicCount; topicIndex++) {
      await topics.nth(topicIndex).click()
      await expect(lab.locator('.module-head h1')).toBeVisible()
      const prediction = lab.locator('#prediction')
      await prediction.selectOption({ index: 1 })
      await lab.locator('#run').click()
      await expect(lab.locator('#explanation')).not.toBeEmpty()
      await lab.locator('#observation').selectOption({ index: 1 })
      await expect(lab.locator('#feedback')).not.toBeEmpty()
      await lab.locator('#reset').click()
      await expect(lab.locator('#prediction')).toHaveValue('')
    }
  }
  expect(total).toBe(11)
  expect(errors).toEqual([])

  await page.getByRole('button', { name: 'Back to Subjects' }).click()
  await expect(page.getByRole('heading', { name: 'Choose a subject' })).toBeVisible()
  await expect(page.locator('.subject-card')).toHaveCount(4)
})

test('Chemistry host language updates the active lab without changing model values', async ({ page }) => {
  const lab = await openChemistry(page)
  const frame = page.locator('iframe.chemistry-module-host__frame')
  await lab.locator('#item').selectOption('Copper')
  await lab.locator('#prediction').selectOption('Glass')
  await lab.locator('#run').click()
  await expect(lab.locator('#item')).toHaveValue('Copper')
  await expect(lab.locator('#explanation')).toContainText('Copper')

  await page.locator('.language-switch button').nth(1).click()
  await expect(page.locator('.chemistry-module-host__title')).toHaveText('रसायन विज्ञान आभासी प्रयोगशाला')
  await expect(lab.locator('html')).toHaveAttribute('lang', 'hi')
  await expect.poll(() => lab.locator('head title').evaluate((title) => title.textContent)).toBe('रसायन विज्ञान आभासी प्रयोगशाला')
  await expect(lab.getByRole('heading', { name: 'हमारे आस-पास की सामग्रियाँ' })).toBeVisible()
  await expect(lab.locator('#item')).toHaveValue('Copper')
  await expect(lab.locator('#prediction')).toHaveValue('Glass')
  await expect(lab.locator('#explanation')).toContainText('ताँबे')
  await expect(frame).toHaveAttribute('src', '/chemistry/index.html')
  await expect.poll(() => lab.locator('body').evaluate((body) => getComputedStyle(body).fontFamily))
    .toContain('Mukta')
  await expect(lab.locator('body')).not.toContainText('[[MISSING:')

  await page.locator('.language-switch button').first().click()
  await expect(lab.getByRole('heading', { name: 'Materials Around Us' })).toBeVisible()
  await expect(lab.locator('#item')).toHaveValue('Copper')

  await page.setViewportSize({ width: 390, height: 844 })
  const dimensions = await lab.locator('html').evaluate((html) => ({
    clientWidth: html.clientWidth,
    scrollWidth: html.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
})

test('Hindi localization covers all 11 Chemistry modules and their control choices', async ({ page }) => {
  const lab = await openChemistry(page)
  await page.locator('.language-switch button').nth(1).click()
  const untranslated: string[] = []
  const collectMissing = async () => {
    const heading = (await lab.locator('.module-head h1').textContent()) ?? 'unknown topic'
    const missing = await page.locator('iframe.chemistry-module-host__frame').evaluate((frame) => {
      const currentWindow = (frame as HTMLIFrameElement).contentWindow as (Window & { __CHEMISTRY_MISSING_TRANSLATIONS?: string[] }) | null
      return currentWindow?.__CHEMISTRY_MISSING_TRANSLATIONS ?? []
    })
    untranslated.push(...missing.map((value) => `${heading}: ${value}`))
  }

  for (const [gradeIndex, topicCount] of [5, 3, 3].entries()) {
    await lab.locator('#class-select').selectOption(String(gradeIndex + 6))
    for (let topicIndex = 0; topicIndex < topicCount; topicIndex++) {
      const topic = lab.locator('.nav-item').nth(topicIndex)
      await topic.click()
      await expect(lab.locator('.module-head h1')).not.toContainText('[[MISSING:')
      await collectMissing()

      for (let pass = 0; pass < 2; pass++) {
        const keys = await lab.locator('#controls [data-key]').evaluateAll((controls) =>
          [...new Set(controls.map((control) => (control as HTMLElement).dataset.key).filter((key): key is string => Boolean(key)))],
        )
        for (const key of keys) {
          const control = lab.locator(`#controls [data-key="${key}"]`).first()
          if (await control.count() === 0 || await control.getAttribute('type') === 'range') continue
          if (await control.evaluate((element) => element.tagName) !== 'SELECT') continue
          const options = await control.locator('option').evaluateAll((items) =>
            items.map((item) => (item as HTMLOptionElement).value).filter(Boolean),
          )
          const current = lab.locator(`#controls [data-key="${key}"]`).first()
          if (options.length && await current.count()) {
            await current.selectOption(options[options.length - 1])
            await collectMissing()
          }
        }
      }

      const range = lab.locator('#controls input[type="range"]').first()
      if (await range.count()) {
        await range.evaluate((input) => {
          const slider = input as HTMLInputElement
          slider.value = String(Math.min(Number(slider.max), Number(slider.value) + 10))
          slider.dispatchEvent(new Event('input', { bubbles: true }))
          slider.dispatchEvent(new Event('change', { bubbles: true }))
        })
      }

      await lab.locator('#prediction').selectOption({ index: 1 })
      await lab.locator('#run').click()
      const observations = await lab.locator('#observation option').evaluateAll((items) =>
        items.map((item) => (item as HTMLOptionElement).value).filter(Boolean),
      )
      for (const observation of observations) {
        await lab.locator('#observation').selectOption(observation)
        await collectMissing()
      }

      if (await lab.locator('#soluteMass').count()) {
        await lab.locator('#soluteMass').fill('5')
        await lab.locator('#solutionMass').fill('100')
        await collectMissing()
      }
      await collectMissing()
    }
  }

  expect([...new Set(untranslated)]).toEqual([])
})
