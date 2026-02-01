import type { BaseApiResponse } from '~~/types'

export function isSuccess<T>(response: BaseApiResponse<T>) {
  return response.status === 'success'
}
