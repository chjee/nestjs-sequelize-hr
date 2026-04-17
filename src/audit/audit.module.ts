import { Module } from '@nestjs/common';
import { AuditLog } from './audit-log.entity';
import { AuditService } from './audit.service';

@Module({
  providers: [
    AuditService,
    { provide: 'AUDIT_LOG_REPOSITORY', useValue: AuditLog },
  ],
  exports: [AuditService],
})
export class AuditModule {}
