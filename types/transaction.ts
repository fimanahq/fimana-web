import type { ObjectId } from './index'

export type TransactionType = 'income' | 'expense' | 'transfer'

export interface Transaction {
  _id: ObjectId
  userId: ObjectId
  accountId: ObjectId
  categoryId: ObjectId
  type: TransactionType
  amount: number
  description: string
  date: Date
  relatedAccountId?: ObjectId // for transfers
  createdAt: Date
}
