import type { ObjectId } from './index'

export type PaymentType = '1-cutoff' | '2-cutoff'

export type LoanStatus = 'active' | 'paid'

export interface Loan {
  _id: ObjectId
  userId: ObjectId
  lender: string
  principal: number
  interestRate: number
  paymentType: PaymentType
  startDate: Date
  status: LoanStatus
}
