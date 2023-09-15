import { Injectable, NestMiddleware } from '@nestjs/common';
import { join } from 'path';
@Injectable()
export class StaticMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const staticPath = join(__dirname, '..', 'public');
    res.render = (view: any, options: any, callback: (arg0: any) => void) => {
      res.sendFile(view, { root: staticPath }, (err: any) => {
        if (err) {
          callback(err);
        }
      });
    };
    next();
  }
}
