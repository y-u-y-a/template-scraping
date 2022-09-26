import { Controller, Get } from '@nestjs/common'
import { AppUsecase } from 'src/usecase/applUsecase'

@Controller()
export class AppController {
  constructor(private readonly usecase: AppUsecase) {}

  /**
   * 技術アイコンをスクレイピングしてファイルをダウンロードする
   * */
  @Get(['/scraping'])
  async scraping(): Promise<void> {
    await this.usecase.scrapingTechIcons()
  }
}
