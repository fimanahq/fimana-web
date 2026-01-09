import type { ObjectId } from './index'

export type GoalStatus = 'active' | 'completed'

export interface Goal {
  _id: ObjectId
  userId: ObjectId
  name: string
  targetAmount: number
  currentAmount: number
  deadline: Date
  status: GoalStatus
}
