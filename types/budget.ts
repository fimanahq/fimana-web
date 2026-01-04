import type { ObjectId } from './index'

export interface Budget {
  _id: ObjectId
  userId: ObjectId
  month: string
  totalLimit: number
  createdAt: Date
}
