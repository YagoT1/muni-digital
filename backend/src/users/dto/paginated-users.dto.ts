import { User } from '../user.entity'

export type SafeUser = Omit<User, 'password'>

export type PaginatedUsersDto = {
  items: SafeUser[]
  total: number
  page: number
  totalPages: number
}
