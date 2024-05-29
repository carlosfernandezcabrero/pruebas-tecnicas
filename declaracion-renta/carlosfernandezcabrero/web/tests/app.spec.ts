import { formatToCurrency } from '@/formatter'
import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForSelector('table')
})

test('Show all borradores', async ({ page }) => {
  await expect(page.locator('table tbody tr')).toHaveCount(6)
})

test('Can edit a borrador and display in the main table', async ({ page }) => {
  const tableRow = page.locator('table tbody tr:nth-child(2)')
  const number = 1000
  const numberFormatted = formatToCurrency(number)

  await tableRow.getByRole('link').click()

  await page.getByRole('link', { name: 'Modificar' }).click()
  await page.getByLabel('Salario bruto percibido').click()
  await page.getByLabel('Salario bruto percibido').fill(String(number))
  await page.getByLabel('Intereses generados').click()
  await page.getByLabel('Intereses generados').fill(String(number))
  await page.getByRole('button', { name: 'Guardar' }).click()

  await expect(
    page.getByText(`Bruto trabajo: ${numberFormatted}`)
  ).toBeVisible()
  await expect(page.getByText(`Bruto banco: ${numberFormatted}`)).toBeVisible()

  await page.goto('/')

  expect(await tableRow.locator('td:nth-child(2)').textContent()).toEqual(
    numberFormatted
  )
  expect(await tableRow.locator('td:nth-child(3)').textContent()).toEqual(
    numberFormatted
  )
})
