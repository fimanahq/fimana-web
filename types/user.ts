import type { ObjectId } from './index'

export type UserRole = 'user' | 'admin'
export type UserStatus = 'active' | 'suspended'

export interface User {
  _id: ObjectId
  email: string
  passwordHash: string
  name: string
  role: UserRole
  status: UserStatus
  createdAt: Date
  updatedAt: Date
}
