import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { StaticMiddleware } from '../middlewares/static/static.middleware';

@Module({
  providers: [LogService, StaticMiddleware],
  controllers: [LogController],
})
export class LogModule {}
