import { test, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

test('student opens the Physics Virtual Lab, navigates classes, and returns to subjects', async ({ page }) => {
  await page.goto('/')
  await page.locator('.group-card').nth(2).click()
  await page.locator('.btn-primary').click()

  await expect(page.getByRole('heading', { name: 'Choose a subject' })).toBeVisible()
  await expect(page.locator('.subject-card')).toHaveCount(4)
  await expect(page.getByRole('button', { name: /Chemistry.*Available/ })).toBeEnabled()
  await expect(page.getByRole('button', { name: /Mathematics.*Available/ })).toBeEnabled()
  await expect(page.getByRole('button', { name: /Biology.*Available/ })).toBeEnabled()
  await expect(page.getByRole('button', { name: /Physics.*Available/ })).toBeEnabled()
  await expect(page.getByRole('button', { name: /Electricity Workbench/ })).toHaveCount(0)

  await page.getByRole('button', { name: /Physics.*Available/ }).click()
  const frame = page.locator('iframe[title="Physics Virtual Lab for Classes 6 to 8"]')
  await expect(frame).toHaveAttribute('src', '/physics/index.html')
  const host = page.locator('.physics-module-host')
  await expect(host).toHaveAttribute('data-bridge-ready', 'true')
  const lab = page.frameLocator('iframe.physics-module-host__frame')
  await expect(lab.getByRole('heading', { name: 'Choose a class or topic' })).toBeVisible()

  await page.locator('.language-switch button').nth(1).click()
  await expect(lab.locator('html')).toHaveAttribute('lang', 'hi')
  await page.locator('.language-switch button').first().click()
  await expect(lab.locator('html')).toHaveAttribute('lang', 'en')

  await lab.locator('.main-nav .nav-button').nth(1).click()
  await expect(lab.getByRole('heading', { name: 'Class 6' })).toBeVisible()
  await expect(host).toHaveAttribute('data-active-grade', '6')
  await expect(host).toHaveAttribute('data-active-module', 'motion-distance')
  await expect(lab.locator('.topic-link')).toHaveCount(4)
  await lab.locator('.main-nav .nav-button').nth(2).click()
  await expect(lab.getByRole('heading', { name: 'Class 7' })).toBeVisible()
  await expect(host).toHaveAttribute('data-active-module', 'heat')
  await expect(lab.locator('.topic-link')).toHaveCount(4)
  await lab.locator('.topic-link').nth(1).click()
  await expect(host).toHaveAttribute('data-active-module', 'motion-time')
  await expect(host).toHaveAttribute('data-last-activity', 'topic_opened')
  await lab.locator('body').evaluate(() => window.parent.postMessage({
    version: 1,
    type: 'PHYSICS_CONTEXT_CHANGED',
    payload: { subject: 'physics', grade: 7, moduleId: 'not-allowed', moduleTitle: 'Unknown', experimentContext: {} },
  }, window.location.origin))
  await expect(host).toHaveAttribute('data-active-module', 'motion-time')
  await page.evaluate(() => window.postMessage({
    version: 1,
    type: 'PHYSICS_CONTEXT_CHANGED',
    payload: { subject: 'physics', grade: 8, moduleId: 'sound', moduleTitle: 'Sound', experimentContext: {} },
  }, window.location.origin))
  await expect(host).toHaveAttribute('data-active-grade', '7')
  await lab.locator('.main-nav .nav-button').nth(3).click()
  await expect(lab.getByRole('heading', { name: 'Class 8' })).toBeVisible()
  await expect(lab.locator('.topic-link')).toHaveCount(6)

  await page.getByRole('button', { name: 'Back to SmartClass Buddy' }).click()
  await expect(page.getByRole('heading', { name: 'Choose a subject' })).toBeVisible()
  await expect(page.locator('.subject-card')).toHaveCount(4)
  await expect(page.evaluate(() => JSON.parse(localStorage.getItem('scb.group') ?? 'null'))).resolves.toBe('C')
})

test('Physics educational UI uses Paper Lab tokens and keeps the simulation dark', async ({ page }) => {
  await page.goto('/')
  await page.locator('.group-card').first().click()
  await page.locator('.btn-primary').click()
  await page.getByRole('button', { name: /Physics.*Available/ }).click()
  const frame = page.locator('iframe[title="Physics Virtual Lab for Classes 6 to 8"]')
  await expect(frame).toBeVisible()
  const lab = page.frameLocator('iframe.physics-module-host__frame')
  await expect(lab.getByRole('heading', { name: 'Choose a class or topic' })).toBeVisible()
  await lab.locator('.main-nav .nav-button').nth(1).click()
  await expect(lab.locator('.topic-link')).toHaveCount(4)
  const appearance = await frame.evaluate((iframe) => {
    const doc = (iframe as HTMLIFrameElement).contentDocument!
    const css = (selector: string) => getComputedStyle(doc.querySelector(selector)!)
    return {
      background: getComputedStyle(doc.body).backgroundColor,
      font: getComputedStyle(doc.documentElement).fontFamily,
      canvas: css('.canvas-shell').backgroundColor,
      embeddedBrand: css('.topbar .brand').display,
      classCount: doc.querySelectorAll('.main-nav .nav-button').length,
    }
  })
  expect(appearance.background).toBe('rgb(251, 246, 234)')
  expect(appearance.font).toContain('Mukta')
  expect(appearance.canvas).toBe('rgb(16, 25, 35)')
  expect(appearance.embeddedBrand).toBe('none')
  expect(appearance.classCount).toBe(4)
  const output = resolve(process.cwd(), 'artifacts/screenshots')
  await mkdir(output, { recursive: true })
  await lab.locator('.main-nav .nav-button').first().click()
  await page.screenshot({ path: resolve(output, 'physics-after-stage1.png'), fullPage: true })
  await lab.locator('.main-nav .nav-button').nth(1).click()
  await expect(lab.locator('.topic-link')).toHaveCount(4)
  await page.screenshot({ path: resolve(output, 'physics-class6-after-stage1.png'), fullPage: true })
})

test('Physics Spark stays scripted and usable offline without sending a tutor request', async ({ page, context }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Group A/ }).click()
  await page.getByRole('button', { name: /Start learning/ }).click()
  await page.getByRole('button', { name: /Physics/ }).click()
  await expect(page.frameLocator('iframe').getByRole('button', { name: 'Open Class 6' })).toBeVisible()
  await page.frameLocator('iframe').getByRole('button', { name: 'Open Class 6' }).click()
  await expect(page.locator('[data-bridge-ready="true"]')).toBeVisible()
  let requestSeen = false
  await page.route('**/api/v1/tutor/physics/respond', route => { requestSeen = true; return route.abort() })
  await context.setOffline(true)
  await page.getByLabel(/Ask Spark about this lesson/).fill('How does this work?')
  await page.getByRole('button', { name: /Ask Spark/ }).click()
  await expect(page.getByText(/Scripted lesson help|Offline lesson help/)).toBeVisible()
  await expect(page.getByText(/metre measures length/)).toBeVisible()
  expect(requestSeen).toBe(false)
  await context.setOffline(false)
})

test('Hindi localizes the active Physics class, module, prediction, quiz, and controls without resetting experiment state', async ({ page }) => {
  await page.goto('/')
  await page.locator('.group-card').first().click()
  await page.locator('.btn-primary').click()
  await page.getByRole('button', { name: /Physics.*Available/ }).click()
  const lab = page.frameLocator('iframe')
  await expect(page.locator('.physics-module-host__title')).toHaveText('Physics Virtual Lab')
  await page.locator('.language-switch button').nth(1).click()
  await expect(page.locator('.physics-module-host__title')).toHaveText('भौतिकी आभासी प्रयोगशाला')
  await expect(lab.getByRole('heading', { name: 'कक्षा या विषय चुनें' })).toBeVisible()
  await expect(lab.getByText(/अपनी कक्षा के भौतिकी पाठ/)).toBeVisible()

  await lab.getByRole('button', { name: 'कक्षा 6 खोलें' }).click()
  await expect(lab.getByRole('heading', { name: /गति और दूरी का मापन/ })).toBeVisible()
  await expect(lab.locator('.prediction-box > p')).toContainText('यदि वस्तु उसी पथ पर तेज़ चले')
  await expect(lab.getByRole('heading', { name: '1. अनुमान लगाएँ' })).toBeVisible()
  await lab.locator('.prediction-choice').first().click()
  await lab.getByRole('button', { name: 'अनुमान जमा करें' }).click()
  const speed = lab.locator('[data-key="speed"]')
  await speed.evaluate((node) => { (node as HTMLInputElement).value = '5'; node.dispatchEvent(new Event('input', { bubbles: true })); node.dispatchEvent(new Event('change', { bubbles: true })) })
  await expect(speed).toHaveValue('5')

  await lab.locator('.main-nav .nav-button').nth(2).click()
  await expect(lab.getByRole('heading', { name: /ऊष्मा/ })).toBeVisible()
  await expect(lab.getByText(/तापमान बताता है/)).toBeVisible()
  await lab.locator('.main-nav .nav-button').nth(3).click()
  await expect(lab.getByRole('heading', { name: /विद्युत: ऊष्मीय, चुंबकीय और रासायनिक प्रभाव/ })).toBeVisible()
  await expect(lab.getByRole('heading', { name: '1. अनुमान लगाएँ' })).toBeVisible()
  await lab.getByRole('button', { name: /कक्षा प्रश्नोत्तरी/ }).click()
  await expect(lab.getByRole('heading', { name: 'आपने क्या जाना, बताएँ' })).toBeVisible()
  await expect(lab.getByText(/क्षेत्र पर 20 N बल/)).toBeVisible()

  await page.locator('.language-switch button').first().click()
  await expect(page.locator('.physics-module-host__title')).toHaveText('Physics Virtual Lab')
  await lab.locator('.main-nav .nav-button').nth(1).click()
  await lab.locator('.topic-link').first().click()
  await expect(lab.getByRole('heading', { name: 'Motion and Measurement of Distances' })).toBeVisible()
  await expect(lab.locator('[data-key="speed"]')).toHaveValue('5')
  await expect(lab.locator('.prediction-choice').first()).toBeDisabled()
})
