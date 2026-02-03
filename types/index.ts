// Base utility types
export type ObjectId = string

export interface Timestamp {
  createdAt?: Date
  updatedAt?: Date
}

export type AppColor = 'success' | 'primary' | 'warning' | 'error' | 'neutral' | 'lime' | 'sky' | 'rose' | 'amber' | 'emerald' | 'violet' | 'cyan' | 'pink' | 'indigo' | 'teal'

export type ApiResponseStatusCode = 200 | 201 | 202 | 204 | 400 | 401 | 403 | 404 | 500

export type ApiResponseStatus = 'success' | 'error'

// Re-export all domain types
export * from './account'
export * from './budget'
export * from './budgetCategory'
export * from './category'
export * from './goal'
export * from './loan'
export * from './loanPayment'
export * from './settings'
export * from './transaction'
export * from './user'
export * from './utils'
