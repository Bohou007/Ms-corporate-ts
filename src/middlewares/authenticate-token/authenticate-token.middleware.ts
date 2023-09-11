import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { config } from '../../config/config.constant';
import { ServicesApiExternes } from '../../common/services-api-externes/services-api-externes.service';

@Injectable()
export class AuthenticateTokenMiddleware implements NestMiddleware {
  constructor(private readonly servicesApiExternes: ServicesApiExternes) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip.split(':').pop();
    const allowedUrls = ['/api/users/password-forgotten', '/api/users/login'];
    const allowedUrlsContent = ['/api/users/reset-password/'];
    if (
      ip === '172.16.9.5' ||
      ip === '127.0.0.1' ||
      allowedUrlsContent.some((url) => req.originalUrl.startsWith(url)) ||
      allowedUrls.includes(req.originalUrl)
    ) {
      next();
    } else {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const profil = req.headers['profil'];
          const item = { token: token, profil: profil };
          if (!token) {
            res.status(401).json({ error: 'Token non fourni.' });
          } else {
            const response = await this.servicesApiExternes.token(
              config.authenticate + '/verify',
              item,
            );
            if (typeof response === 'boolean' && response) {
              next();
            } else if (Array.isArray(response) && response.length === 2) {
              const [status, data] = response;
              res.status(status).json(data);
            } else {
              // core les cas demurrer inattention ici
            }
          }
        } catch (error) {
          console.log(error);
          res.status(error.response.status).json(error.response.data);
        }
      } else {
        res.status(401).json({ error: 'Requête non authentifiée !' });
      }
    }
  }
}
