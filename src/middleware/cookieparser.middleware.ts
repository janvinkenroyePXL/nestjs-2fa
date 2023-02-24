import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) {};

    use(req: Request, res: Response, next: NextFunction) {
        // For signed cookies
        cookieParser(this.configService.get('COOKIE_SECRET'))(req, res, next);
        // For unsigned cookies
        // cookieParser()(req, res, next);
    }
}
