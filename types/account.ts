import type { ObjectId } from './index'

export type AccountType = 'cash' | 'bank' | 'ewallet' | 'credit'

export interface Account {
  _id: ObjectId
  userId: ObjectId
  name: string
  type: AccountType
  currency: 'PHP'
  balance: number
  isArchived: boolean
  createdAt: Date
}
