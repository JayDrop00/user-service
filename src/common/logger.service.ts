import { Injectable, Logger as NestLogger } from '@nestjs/common';

@Injectable()
export class Logger {
  private logger = new NestLogger('UserService');

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
