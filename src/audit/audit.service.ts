import { Inject, Injectable } from '@nestjs/common';
import { AuditLog } from './audit-log.entity';

export interface AuditEntry {
  user_id?: string;
  method: string;
  path: string;
  request_id?: string;
  status_code: number;
  request_body?: string;
}

@Injectable()
export class AuditService {
  constructor(
    @Inject('AUDIT_LOG_REPOSITORY')
    private readonly auditLogRepository: typeof AuditLog,
  ) {}

  async log(entry: AuditEntry): Promise<void> {
    await this.auditLogRepository.create({ ...entry });
  }
}
