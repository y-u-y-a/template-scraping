import { Injectable } from '@nestjs/common'

import { initPuppeteer } from 'src/libs/puppeteer'

const sleep = async (msec: number) => {
  setTimeout(() => {
    return
  }, msec)
}

@Injectable()
export class AppUsecase {
  /** 技術アイコンをスクレイピングする */
  async scrapingTechIcons(): Promise<void> {
    const { page } = await initPuppeteer()
    const url = 'https://svgporn.com/'
    try {
      await page.goto(url, { waitUntil: 'networkidle2' })
      const client = await page.target().createCDPSession()
      client.send('Browser.setDownloadBehavior', {
        behavior: 'allow', // ダウンロードを許可
        downloadPath: 'downloads', // ダウンロード先のフォルダを指定
      })
      await page.waitForTimeout(3000)
      // スクロール
      let num = 0
      while (num < 5) {
        console.log('scroll')
        await page.$eval('.Item_itemDownload__nHiNp', el => el.scrollIntoView(true))
        await page.waitForTimeout(3000)
        num++
      }
      //
      const links: string[] = await page.evaluate(selector => {
        const list = []
        const nodeList = document.querySelectorAll(selector)
        nodeList.forEach(async node => {
          // list.push(node.getAttribute('href'))
          await page.click(`.Item_itemDownload__nHiNp[href="${node.getAttribute('href')}"]`)
        })
        return list
      }, '.Item_itemDownload__nHiNp')
      console.log('links', links.length)
      // for (const n in links) {
      //   await page.click(`.Item_itemDownload__nHiNp[href="${links[n]}"]`)
      // }
      await sleep(5000)
    } catch (err) {
      console.log('err >>>>>', err)
    } finally {
      // browser.close()
    }
    return
  }
}
