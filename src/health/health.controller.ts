import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  HealthIndicator,
  HealthIndicatorStatus,
} from '@nestjs/terminus';
import { Sequelize } from 'sequelize-typescript';
import { Public } from '../auth/decorators/public.decorator';

class SequelizePingIndicator extends HealthIndicator {
  constructor(private readonly sequelize: Sequelize) {
    super();
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.sequelize.authenticate();
      return this.getStatus(key, true);
    } catch {
      return this.getStatus(key, false);
    }
  }
}

@Controller('health')
@ApiTags('Health API')
export class HealthController {
  private readonly dbIndicator: SequelizePingIndicator;

  constructor(
    private health: HealthCheckService,
    @Inject('SEQUELIZE') sequelize: Sequelize,
  ) {
    this.dbIndicator = new SequelizePingIndicator(sequelize);
  }

  @Public()
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Health Check API', description: 'Check DB connection status' })
  check() {
    return this.health.check([() => this.dbIndicator.pingCheck('database')]);
  }
}
