import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './controller/appHandler'
import { AppUsecase } from './usecase/applUsecase'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
  ],
  controllers: [AppController],
  providers: [AppUsecase],
})
export class AppModules {}
