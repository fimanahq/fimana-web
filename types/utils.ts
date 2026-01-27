// Type definition for a nested record structure
import type { ApiResponseStatusCode } from './index'

export type DeepRecord = Record<string, Record<string, string[]> | string[]>

// Type definitions for query parameters
type SortDirection = 'asc' | 'desc'

type FilterField<T> = {
  [K in keyof T]: `${K & string}:${T[K] & (string | number | boolean)}`
}[keyof T]

type SortField<T> = {
  [K in keyof T]: `${K & string}:${SortDirection}`
}[keyof T]

// Interface for query parameters
export interface QueryParams<T = object> {
  search?: string
  page?: number
  itemsPerPage?: number
  sort?: SortField<T> | SortField<T>[]
  filter?: FilterField<T> | FilterField<T>[]
  fields?: (keyof T)[]
  // dateRange?: `${string}_to_${string}`
}

// Interfaces for API response
export interface PagedMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface BaseApiResponse<T> {
  status: 'success'
  code: ApiResponseStatusCode
  message: string
  data: T
  meta?: Record<string, unknown>
}

// Type definition for API response with optional pagination
export type ApiResponse<T> = T extends Array<unknown>
  ? BaseApiResponse<T> & { meta?: PagedMeta & Record<string, unknown>; }
  : BaseApiResponse<T>

export interface ErrorApiResponse {
  status: 'error'
  code: number
  message: string
  errors?: string[]
  meta?: Record<string, unknown>
}
