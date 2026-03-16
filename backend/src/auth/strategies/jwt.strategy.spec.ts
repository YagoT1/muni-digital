import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'
import { UsersService } from '../../users/users.service'
import { UserRole } from '../../users/user.entity'

describe('JwtStrategy', () => {
  let strategy: JwtStrategy
  let usersService: { findById: jest.Mock }

  beforeEach(async () => {
    usersService = {
      findById: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) =>
              key === 'JWT_SECRET' ? 'test-secret' : undefined,
            ),
          },
        },
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile()

    strategy = module.get<JwtStrategy>(JwtStrategy)
  })

  it('returns id for admin user', async () => {
    usersService.findById.mockResolvedValue({
      id: 1,
      dni: '12345678',
      email: 'admin@demo.local',
      role: UserRole.ADMIN,
      legajo: null,
      isActive: true,
    })

    const result = await strategy.validate({ sub: 1 })
    expect(result).toEqual({
      id: 1,
      dni: '12345678',
      email: 'admin@demo.local',
      role: UserRole.ADMIN,
      legajo: null,
      isActive: true,
    })
  })

  it('does not return id for ciudadano user', async () => {
    usersService.findById.mockResolvedValue({
      id: 2,
      dni: '23456789',
      email: 'ciudadano@demo.local',
      role: UserRole.CIUDADANO,
      legajo: null,
      isActive: true,
    })

    const result = await strategy.validate({ sub: 2 })
    expect(result).toEqual({
      dni: '23456789',
      email: 'ciudadano@demo.local',
      role: UserRole.CIUDADANO,
      legajo: null,
      isActive: true,
    })
  })
})
