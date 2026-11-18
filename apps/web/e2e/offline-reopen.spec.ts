import { test, expect } from '@playwright/test'

test('the built app shell reopens without a network connection after first visit', async ({ page, context }) => {
  await page.goto('/')
  await page.locator('.group-card').nth(1).click()
  await page.locator('.btn-primary').click()
  await page.getByRole('button', { name: /Physics/ }).click()
  await expect(page.locator('iframe[title="Physics Virtual Lab for Classes 6 to 8"]')).toBeVisible()
  await page.evaluate(async () => {
    if ('serviceWorker' in navigator) await navigator.serviceWorker.ready
  })
  await page.reload()
  await expect(page.locator('.brand-name')).toBeVisible()
  await context.setOffline(true)
  await page.reload()
  await expect(page.locator('.brand-name')).toBeVisible()
  await page.getByRole('button', { name: /Physics/ }).click()
  const lab = page.frameLocator('iframe[title="Physics Virtual Lab for Classes 6 to 8"]')
  await expect(lab.getByRole('heading', { name: 'Choose a class or topic' })).toBeVisible()
})
