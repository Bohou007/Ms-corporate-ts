import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from '../../config/winston-config';
@Injectable()
export class ResponseLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    // Capturer le corps de la requête
    const requestBody = { ...req.body };

    // Intercepter la méthode res.send pour capturer le corps de la réponse
    const originalSend = res.send;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.send = function (body: any) {
      // Enregistrez les informations de la requête et de la réponse avec Winston
      const logData = {
        requestDate: start,
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        requestTime: Date.now() - start, // Mesurer le temps de la requête
        requestBody,
        responseBody: body,
        ip: req.ip,
        userAgent: req.headers['user-agent'], // User-Agent
      };

      // Utilisez Winston pour enregistrer les journaux
      logger.info('Request/Response Log:', logData);

      // Envoyer la réponse comme d'habitude
      originalSend.call(this, body);
    };

    next();
  }
}
