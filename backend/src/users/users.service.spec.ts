import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { CreateUserService } from './use-cases/create-user.service'
import { UpdateUserService } from './use-cases/update-user.service'
import { ResetPasswordService } from './use-cases/reset-password.service'
import { UserStatsService } from './use-cases/user-stats.service'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CreateUserService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateUserService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ResetPasswordService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UserStatsService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findAndCount: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
