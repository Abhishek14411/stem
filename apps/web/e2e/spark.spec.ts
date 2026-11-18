import { test, expect } from '@playwright/test'

for (const language of ['en', 'hi'] as const) {
  test(`Spark uses evaluator context and cannot change circuit state (${language})`, async ({ page }) => {
    let submitted: any
    await page.route('**/api/v1/tutor/respond', async (route) => {
      submitted = route.request().postDataJSON()
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
        message: language === 'en' ? '<b>The bulb should glow!</b>' : '<b>???? ???? ?????!</b>', hint: null,
        follow_up_question: null, misconception_tag: null, status: 'ok',
      }) })
    })
    await page.goto('/?legacyWorkbench=1')
    if (language === 'hi') await page.locator('.language-switch button').nth(1).click()
    await page.locator('.group-card').first().click()
    await page.locator('.btn-primary').click()
    await page.getByRole('radio').first().click()
    await page.locator('.card .btn-primary').click()
    await expect(page.locator('.circuit-board')).toBeVisible()
    await page.locator('#spark-question').fill('Why is my bulb off?')
    await page.locator('.spark-question .btn').click()
    await expect(page.locator('.spark-label')).toBeVisible()
    expect(submitted.language).toBe(language)
    expect(submitted.circuit_context).toEqual({ battery_present: false, bulb_count: 0, wire_gaps: 4, switch_present: false, switch_open: null, evaluator_powered: false })
    await expect(page.locator('.circuit-board')).not.toHaveClass(/is-powered/)
    await expect(page.locator('.panel-success')).toHaveCount(0)
    await expect(page.locator('.spark-answer')).toContainText(language === 'en' ? '<b>The bulb should glow!</b>' : '<b>???? ???? ?????!</b>')
    await expect(page.locator('.spark-answer b')).toHaveCount(0)
    const events = await page.evaluate(() => JSON.parse(localStorage.getItem('scb.events') ?? '[]'))
    const tutorEvent = events.find((event: { type: string }) => event.type === 'tutor_requested')
    expect(tutorEvent).toMatchObject({ groupId: 'A', screen: 'workbench', challenge: 1 })
    expect(JSON.stringify(tutorEvent)).not.toContain('Why is my bulb off?')
  })
}

test('Spark is available as scripted offline help without sending requests', async ({ page, context }) => {
  await page.goto('/?legacyWorkbench=1')
  await page.locator('.group-card').first().click()
  await page.locator('.btn-primary').click()
  await page.getByRole('radio').first().click()
  await page.locator('.card .btn-primary').click()
  let calls = 0
  await page.route('**/api/v1/tutor/respond', route => { calls++; return route.abort() })
  await context.setOffline(true)
  await page.locator('#spark-question').fill('Give me a hint')
  await page.locator('.spark-question .btn').click()
  await expect(page.locator('.spark-label')).toContainText('Offline help')
  expect(calls).toBe(0)
  await page.locator('.part-button').first().click()
  await page.locator('[data-slot="0"]').click()
  await expect(page.locator('[data-part="battery"]')).toBeVisible()
})

test('Spark labels backend failures as scripted help and prevents duplicate submit', async ({ page }) => {
  let calls = 0
  await page.route('**/api/v1/tutor/respond', async (route) => {
    calls++
    await new Promise((resolve) => setTimeout(resolve, 400))
    await route.abort()
  })
  await page.goto('/?legacyWorkbench=1')
  await page.locator('.group-card').first().click()
  await page.locator('.btn-primary').click()
  await page.getByRole('radio').first().click()
  await page.locator('.card .btn-primary').click()
  await page.locator('#spark-question').fill('Why is my bulb off?')
  await page.locator('.spark-question .btn').click()
  await expect(page.locator('.spark-question .btn')).toBeDisabled()
  await page.locator('.spark-question .btn').click({ force: true }).catch(() => undefined)
  await expect(page.locator('.spark-answer [role="status"]')).toBeVisible()
  await expect(page.locator('.spark-label')).toHaveText('Scripted help')
  expect(calls).toBe(1)
  const scripts = await page.evaluate(async () => { const urls = [...document.scripts].filter((script) => script.src).map((script) => script.src); return Promise.all(urls.map(async (url) => (await fetch(url)).text())) })
  expect(scripts.join('')).not.toMatch(/GEMINI_API_KEY|VITE_GEMINI|AIza[\w-]{20,}/)
})

