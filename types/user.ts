import type { ObjectId, Timestamp } from './index'

export type UserRole = 'user' | 'admin'
export type UserStatus = 'active' | 'suspended'

export interface User extends Timestamp {
  id?: ObjectId
  email: string
  password: string
  firstName: string
  lastName: string
  role?: UserRole
  status?: UserStatus
}
