import type { ObjectId } from './index'

export type CategoryType = 'income' | 'expense'

export interface Category {
  _id: ObjectId
  userId: ObjectId
  name: string
  type: CategoryType
  icon: string
  color: string
  isSystem: boolean
}
