import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class JsonMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Vérifiez si le contenu de la réponse n'est pas déjà en JSON
    if (!res.getHeader('Content-Type')) {
      res.header('Content-Type', 'application/json');
    }

    // Si le contenu de la réponse est une chaîne de caractères, convertissez-la en JSON
    if (typeof res.locals.data === 'string') {
      res.locals.data = JSON.parse(res.locals.data);
    }
    next();
  }
}
