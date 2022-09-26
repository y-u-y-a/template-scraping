import { NestFactory } from '@nestjs/core'
import { AppModules } from './app'

async function bootstrap() {
  const app = await NestFactory.create(AppModules)
  await app.listen(4000)
}
bootstrap()
