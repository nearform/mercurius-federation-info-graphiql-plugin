// @ts-check
const { test, expect } = require('@playwright/test')

test('visits URL', async render => {
  await render.page.goto('http://localhost:3001/graphiql')
  //click Federation Info explorer button
  render.page.getByTestId('plugin-icon').click()
  await expect(render.page.getByText('Federation Info')).toBeVisible()
  //await expect(render.page.getByRole('heading', { name: 'Services' })).toBeVisible();
  await expect(render.page.getByText('Welcome to GraphiQL')).toBeVisible()
})
