import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { AuditService } from '../../audit/audit.service';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

const WRITE_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE']);

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    if (!WRITE_METHODS.has(req.method)) {
      return next.handle();
    }

    const user = (req as any).user;
    const requestBody = req.body ? JSON.stringify(req.body) : undefined;

    return next.handle().pipe(
      tap(() => {
        this.auditService
          .log({
            user_id: user?.userId,
            method: req.method,
            path: req.url,
            request_id: req.headers[REQUEST_ID_HEADER] as string,
            status_code: res.statusCode,
            request_body: requestBody,
          })
          .catch(() => {});
      }),
    );
  }
}
