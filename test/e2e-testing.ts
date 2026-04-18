export function configureE2eEnvironment(): void {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET ??=
    'test-jwt-secret-with-enough-length-for-validation';
  process.env.DB_HOST ??= 'localhost';
  process.env.DB_PORT ??= '3306';
  process.env.DB_USERNAME ??= 'test';
  process.env.DB_PASSWORD ??= 'test';
  process.env.DB_NAME ??= 'hr_db_test';
  process.env.DB_SYNC = 'false';
  process.env.DB_MIGRATE = 'false';
  process.env.DB_LOGGING = 'false';
}

export function createE2eProviderMocks() {
  return {
    sequelize: {
      authenticate: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
    },
    userRepository: {
      findOne: jest.fn().mockResolvedValue(null),
      findAndCountAll: jest.fn().mockResolvedValue({ rows: [], count: 0 }),
      findByPk: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    refreshTokenRepository: {
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      destroy: jest.fn(),
    },
    employeeRepository: {
      findAndCountAll: jest.fn().mockResolvedValue({ rows: [], count: 0 }),
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    departmentRepository: {
      findAndCountAll: jest.fn().mockResolvedValue({ rows: [], count: 0 }),
      findOne: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
    auditLogRepository: {
      create: jest.fn().mockResolvedValue({}),
    },
  };
}
