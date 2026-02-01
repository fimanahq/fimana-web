import type { ObjectId } from './index'

export interface Category {
  _id: ObjectId
  userId: ObjectId
  name: string
  icon: string
  iconStyle: string
  parentId?: ObjectId | null
  isActive: boolean
  isSystem: boolean
  createdAt?: Date
  updatedAt?: Date
}
