import type { ObjectId } from './index'

export interface BudgetCategory {
  _id: ObjectId
  budgetId: ObjectId
  categoryId: ObjectId
  limit: number
}
