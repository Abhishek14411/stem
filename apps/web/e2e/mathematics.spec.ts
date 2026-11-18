import { expect, test } from '@playwright/test'

async function openMathematics(page: import('@playwright/test').Page) {
  await page.goto('/')
  const english = page.locator('.language-switch button').first()
  if (await english.getAttribute('aria-pressed') !== 'true') await english.click()
  await page.locator('.group-card').first().click()
  await page.locator('.btn-primary').click()
  await expect(page.getByRole('heading', { name: 'Choose a subject' })).toBeVisible()
  await page.getByRole('button', { name: /Mathematics.*Available/ }).click()
  const frame = page.locator('iframe.mathematics-module-host__frame')
  await expect(frame).toHaveAttribute('src', '/mathematics/index.html')
  await expect(page.locator('.mathematics-module-host')).toHaveAttribute('data-loaded', 'true')
  return page.frameLocator('iframe.mathematics-module-host__frame')
}

const moduleTitles = [
  [
    'Whole Numbers and Integers',
    'Fractions and Decimals',
    'Ratio and Proportion',
    'Basic Algebra',
    'Geometry and Measurement',
    'Perimeter, Area, and Data',
  ],
  [
    'Rational Numbers and Percentages',
    'Algebraic Expressions and Equations',
    'Lines, Angles, and Triangles',
    'Congruence and Symmetry',
    'Comparing Quantities and Data',
    'Perimeter, Area, and 3D Shapes',
  ],
  [
    'Rational Numbers, Powers, and Squares',
    'Linear Equations',
    'Proportions, Percentages, and Variation',
    'Geometry: Polygons and 3D Figures',
    'Mensuration',
    'Data Handling and Probability',
  ],
]

test('Mathematics opens all 18 activities and updates interactive models', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  const lab = await openMathematics(page)
  await expect(lab.locator('.brand')).toBeVisible()
  await expect(lab.getByRole('heading', { name: 'Make a guess. Try it out. Learn why.' })).toBeVisible()

  for (const [gradeIndex, titles] of moduleTitles.entries()) {
    await lab.locator('.grade-button').nth(gradeIndex).click()
    const topics = lab.locator('.topic-list.mobile-open .topic-button')
    await expect(topics).toHaveCount(6)

    for (const [topicIndex, title] of titles.entries()) {
      await topics.nth(topicIndex).click()
      await expect(lab.locator('.activity-title h2')).toHaveText(title)
      await expect(lab.locator('.visual svg')).toBeVisible()
      await expect(lab.locator('.explanation')).not.toBeEmpty()
      await expect(lab.locator('.question')).toBeVisible()
      await expect(lab.locator('.topic-question')).not.toBeEmpty()
      if (title === 'Basic Algebra') {
        await expect(lab.locator('#math')).toContainText('x = (12 − 2) ÷ 2 = 5')
      } else if (title === 'Algebraic Expressions and Equations') {
        await expect(lab.locator('#math')).toContainText('2x + 1 = 2(3) + 1 = 7')
      } else if (title === 'Linear Equations') {
        await expect(lab.locator('#math')).toContainText('x = (14 − 4) ÷ 2 = 5')
      }

      const slider = lab.locator('#controls input[type="range"]').first()
      if (await slider.count()) {
        await slider.evaluate((element) => {
          const input = element as HTMLInputElement
          const value = Number(input.value)
          input.value = String(value < Number(input.max) ? value + 1 : value - 1)
          input.dispatchEvent(new Event('input', { bubbles: true }))
          input.dispatchEvent(new Event('change', { bubbles: true }))
        })
      }

      await expect(lab.locator('#math')).not.toBeEmpty()
    }
  }
  expect(errors).toEqual([])
})

test('host language switching preserves Mathematics controls and quiz state on mobile', async ({ page }) => {
  const lab = await openMathematics(page)
  await lab.locator('.grade-button').nth(1).click()
  await lab.locator('.topic-list.mobile-open .topic-button').nth(1).click()
  await lab.locator('#c-x').evaluate((element) => {
    const input = element as HTMLInputElement
    input.value = '5'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  })
  await expect(lab.locator('#c-x')).toHaveValue('5')
  const question = await lab.locator('.topic-question').textContent()
  const options = await lab.locator('.topic-options button').allTextContents()
  await lab.locator('.topic-options button').first().click()
  await expect(lab.locator('.quiz-feedback')).not.toBeEmpty()
  const optionClasses = await lab.locator('.topic-options button').evaluateAll((buttons) =>
    buttons.map((button) => (button as HTMLButtonElement).className),
  )

  await page.locator('.language-switch button').nth(1).click()
  await expect(page.locator('.mathematics-module-host__title')).toHaveText('गणित आभासी प्रयोगशाला')
  await expect(lab.locator('html')).toHaveAttribute('lang', 'hi')
  await expect(lab.getByRole('heading', { name: 'बीजीय व्यंजक और समीकरण' })).toBeVisible()
  await expect(lab.locator('#c-x')).toHaveValue('5')
  await expect(lab.locator('.topic-question')).not.toHaveText(question ?? '')
  await expect(lab.locator('.topic-options button')).toHaveCount(options.length)
  expect(await lab.locator('.topic-options button').evaluateAll((buttons) =>
    buttons.map((button) => (button as HTMLButtonElement).className),
  )).toEqual(optionClasses)

  await page.locator('.language-switch button').first().click()
  await expect(lab.locator('html')).toHaveAttribute('lang', 'en')
  await expect(lab.locator('#c-x')).toHaveValue('5')
  await expect(lab.locator('.topic-options button')).toHaveText(options)
  expect(await lab.locator('.topic-options button').evaluateAll((buttons) =>
    buttons.map((button) => (button as HTMLButtonElement).className),
  )).toEqual(optionClasses)

  await page.setViewportSize({ width: 390, height: 844 })
  const dimensions = await lab.locator('html').evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }))
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth)
})

test('Hindi localizes all 18 activities, Canvas labels, and generated quiz content', async ({ page }) => {
  test.setTimeout(120_000)
  const lab = await openMathematics(page)
  await page.locator('.language-switch button').nth(1).click()
  await expect(lab.locator('html')).toHaveAttribute('lang', 'hi')
  const untranslated: string[] = []

  const collectEnglish = async (label: string, selector = '.activity-head, .steps, .lab-grid, .quiz-section') => {
    const text = (await lab.locator(selector).allInnerTexts()).join(' ')
    const words = text.match(/\b[A-Za-z]{3,}\b/g) ?? []
    untranslated.push(...words.map((word) => `${label}: ${word}`))
  }

  for (const [gradeIndex, titles] of moduleTitles.entries()) {
    await lab.locator('.grade-button').nth(gradeIndex).click()
    const topics = lab.locator('.topic-list.mobile-open .topic-button')

    for (const [topicIndex, title] of titles.entries()) {
      await topics.nth(topicIndex).click()
      await expect(lab.locator('.activity-title h2')).not.toContainText('[[MISSING:')
      await collectEnglish(title)

      for (let question = 0; question < 10; question++) {
        await lab.locator('.topic-options button').first().click()
        await collectEnglish(`${title} quiz ${question + 1}`, '.topic-quiz-card, .quiz-summary')
        if (question < 9) await lab.locator('#continueQuiz').click()
      }
    }
  }

  expect([...new Set(untranslated)]).toEqual([])
})
