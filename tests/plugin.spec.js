/* eslint-disable testing-library/prefer-screen-queries */
const { test, expect } = require('@playwright/test')

test('visits URL', async ({ page }) => {
  await page.goto('http://localhost:3001/graphiql')
  //click Federation Info explorer button
  page.getByTestId('plugin-icon').click()
  await expect(page.getByText('Federation Info')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()
  await expect(page.getByText('Welcome to GraphiQL')).toBeVisible()
})
