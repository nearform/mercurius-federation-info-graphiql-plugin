/* eslint-disable testing-library/prefer-screen-queries */
const { test, expect } = require('@playwright/test')

test('checks Federation Info headings and buttons', async ({ page }) => {
  await page.goto('http://localhost:3001/graphiql')
  //clicks Federation Info explorer button
  await page.getByTestId('plugin-icon').click()
  await expect(page.getByText('Federation Info')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Unified schema' })
  ).toBeVisible()
  await expect(page.getByRole('button', { name: 'user service' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'post service' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Unified schema' })
  ).toBeVisible()
  await page.getByText('heading', { name: 'Queries' }).isVisible()
  await page.getByText('heading', { name: 'Mutations' }).isVisible()
  await page.getByText('heading', { name: 'Subscriptions' }).isVisible()
  await page.getByText('heading', { name: 'Types' }).isVisible()
})
