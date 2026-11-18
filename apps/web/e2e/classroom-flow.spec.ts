import { test, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const screenshotDirectory = resolve(process.cwd(), 'artifacts/screenshots')

async function saveScreen(page: import('@playwright/test').Page, name: string) {
  await mkdir(screenshotDirectory, { recursive: true })
  await page.screenshot({ path: resolve(screenshotDirectory, name), fullPage: true })
  const measurements = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }))
  expect(measurements.scroll).toBeLessThanOrEqual(measurements.width)
}

async function place(page: import('@playwright/test').Page, trayIndex: number, slot: number) {
  await page.locator('.part-button').nth(trayIndex).click()
  await page.locator(`[data-slot="${slot}"]`).click()
}

for (const language of ['en', 'hi'] as const) {
  test(`complete the bilingual classroom journey and capture screens: ${language}`, async ({ page }, testInfo) => {
    await page.goto('/?legacyWorkbench=1')
    if (language === 'hi') await page.locator('.language-switch button').nth(1).click()
    const suffix = `${language}-${testInfo.project.name}`

    await saveScreen(page, `${suffix}-01-group-picker.png`)
    await page.locator('.group-card').first().click()
    await page.locator('.btn-primary').click()
    await expect(page.locator('main h1')).toBeVisible()
    await saveScreen(page, `${suffix}-mission.png`)
    await saveScreen(page, `${suffix}-02-mission-predict.png`)
    await page.getByRole('radio').first().click()
    await page.locator('.card .btn-primary').click()
    await expect(page.locator('.circuit-board')).toBeVisible()
    await expect(page.locator('.circuit-board')).not.toHaveClass(/is-powered/)
    await saveScreen(page, `${suffix}-workbench-incomplete.png`)
    await saveScreen(page, `${suffix}-03-workbench.png`)

    const firstSocket = page.locator('[data-slot="0"]')
    const socketBeforePulse = await firstSocket.boundingBox()
    await page.waitForTimeout(900)
    const socketAfterPulse = await firstSocket.boundingBox()
    expect(socketAfterPulse).toEqual(socketBeforePulse)

    // Challenge 1: one battery, one bulb, and two wire segments.
    await page.locator('.workbench-actions .btn').first().click()
    await place(page, 0, 0)
    await place(page, 1, 1)
    await expect(page.locator('[data-part="bulb"] circle').nth(0)).toHaveAttribute('fill', 'var(--paper)')
    const socketBoxBefore = await page.locator('[data-slot="2"]').boundingBox()
    await page.waitForTimeout(850)
    const socketBoxAfter = await page.locator('[data-slot="2"]').boundingBox()
    expect(socketBoxAfter).toEqual(socketBoxBefore)
    await place(page, 3, 2)
    await place(page, 3, 3)
    await expect(page.locator('.workbench-status .status-chip')).toHaveClass(/\bok\b/)
    await expect(page.locator('.circuit-board')).toHaveClass(/is-powered/)
    await expect(page.locator('[data-part="bulb"] circle').nth(0)).toHaveAttribute('fill', 'var(--spark)')
    await expect(page.locator('.panel-success')).toBeVisible()
    await expect(page.locator('.star.on')).toHaveCount(1)
    await saveScreen(page, `${suffix}-workbench-complete-glowing.png`)

    await page.locator('.app-header .icon-button').nth(1).click()
    await expect(page.locator('[data-metric="challenge-completions"]')).toHaveText('1')
    await expect(page.locator('[data-metric="challenge-types"]')).toHaveText('1')
    await expect(page.locator('.event-item').filter({ hasText: language === 'hi' ? 'बैटरी लगाई' : 'Battery placed' })).toHaveCount(1)
    await expect(page.locator('.event-item').filter({ hasText: language === 'hi' ? 'चुनौती पूरी की' : 'Challenge completed' })).toHaveCount(1)
    await expect(page.locator('.event-item small').first()).toContainText(language === 'hi' ? 'समूह A' : 'Group A')
    await saveScreen(page, `${suffix}-pulse-meaningful-events.png`)
    const persistedEvents = await page.evaluate(() => JSON.parse(localStorage.getItem('scb.events') ?? '[]') as Array<{ type: string; groupId: string; at: string }>)
    expect(persistedEvents.some((event) => event.type === 'battery_placed' && event.groupId === 'A' && Boolean(event.at))).toBe(true)
    await page.reload()
    await page.locator('.app-header .icon-button').nth(1).click()
    await expect(page.locator('[data-metric="challenge-completions"]')).toHaveText('1')
    await expect(page.locator('.event-item').filter({ hasText: language === 'hi' ? 'बैटरी लगाई' : 'Battery placed' })).toHaveCount(1)
    await page.locator('main .btn-primary').click()
    await page.locator('.step-button').nth(1).click()
    await expect(page.locator('.workbench-actions .btn-primary')).toBeVisible()
    await page.locator('.workbench-actions .btn-primary').click()

    // Challenge 2: one battery, two bulbs, and one wire segment.
    await place(page, 0, 0)
    await place(page, 1, 1)
    await place(page, 1, 2)
    await place(page, 3, 3)
    await expect(page.locator('.panel-success')).toBeVisible()
    await page.locator('.workbench-actions .btn-primary').click()

    // Challenge 3: the switch must be opened and then closed again.
    await place(page, 0, 0)
    await place(page, 1, 1)
    await place(page, 3, 2)
    await place(page, 2, 3)
    await page.locator('[data-slot="3"]').click()
    await expect(page.locator('.workbench-status .status-chip')).not.toHaveClass(/\bok\b/)
    await page.locator('[data-slot="3"]').click()
    await expect(page.locator('.workbench-status .status-chip')).toHaveClass(/\bok\b/)
    await expect(page.locator('.panel-success')).toBeVisible()
    await expect(page.locator('.star.on')).toHaveCount(3)
    await page.locator('.workbench-actions .btn-primary').click()

    await expect(page.locator('main h1')).toBeVisible()
    await saveScreen(page, `${suffix}-04-explain.png`)
    await page.locator('main .btn-primary').click()
    await saveScreen(page, `${suffix}-05-quiz.png`)
    const correctAnswers = [0, 1, 2, 1, 1]
    for (let question = 0; question < 5; question += 1) {
      await page.getByRole('radio').nth(correctAnswers[question]).click()
      await page.locator('.card .btn-primary').click()
    }
    await expect(page.locator('textarea')).toBeVisible()
    await saveScreen(page, `${suffix}-06-reflect.png`)
    await page.locator('textarea').fill(language === 'hi' ? 'स्विच खोलने पर बल्ब बुझ गया।' : 'The bulb turned off when I opened the switch.')
    await page.locator('main .btn-primary').click()
    await expect(page.locator('main h1')).toBeVisible()
    await saveScreen(page, `${suffix}-07-pulse-board.png`)
    await expect(page.locator('.metric-value').first()).not.toHaveText('0')
    await expect(page.locator('.metric-value').nth(1)).toHaveText('1')
    await expect(page.locator('.metric-value').nth(2)).not.toHaveText('0')
    await expect(page.locator('[data-metric="challenge-completions"]')).toHaveText('3')
    await expect(page.locator('[data-metric="challenge-types"]')).toHaveText('3')
    await expect(page.locator('.event-item')).toHaveCount(12)
    await expect(page.locator('.event-item').first()).toBeVisible()
  })
}

