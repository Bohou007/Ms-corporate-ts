import { Controller, Get, Render } from "@nestjs/common";
import { LogService } from './log.service';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @Render('index')
  async getLogs() {
    const logs = this.logService.readLogs();
    return { logs };
  }
}
