import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh-token') {
  handleRequest(err, user, info: Error) {
    if (err || info || !user) {
      if (info.name === 'TokenExpiredError') {
        throw new HttpException('RefreshTokenExpired', HttpStatus.UNAUTHORIZED);
      } else {
        console.log(info, 'info');
        throw err;
      }
    }
    return user;
  }
}
