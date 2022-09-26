import pup from 'puppeteer'

/** puppeteerで仮想ブラウザを起動・スクレイピングに必要な情報を返す */
export const initPuppeteer = async () => {
  const options = {
    headless: false,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
    ],
  }
  const browser = await pup.launch(options)
  const page = await browser.newPage()
  // await page.setRequestInterception(true) // Enable abort/continue, response methods.
  // //
  // page.on('request', (request) => {
  //     const rType = request.resourceType()
  //     const isAssets = ['font', 'image', 'stylesheet'].includes(rType)
  //     if (isAssets) request.abort().catch((err) => console.error(err))
  // })
  page.on('error', () => browser.close()) // When page clashing.
  return { browser, page }
}
