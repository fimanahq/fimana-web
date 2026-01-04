import type { ObjectId } from './index'

export interface Settings {
  _id: ObjectId
  userId: ObjectId
  currency: 'PHP'
  startOfMonth: number
}
