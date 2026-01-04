export type LoanPaymentStatus = 'pending' | 'paid'

export interface LoanPayment {
  _id: ObjectId
  loanId: ObjectId
  amount: number
  interest: number
  principal: number
  dueDate: Date
  paidDate?: Date
  status: LoanPaymentStatus
}
