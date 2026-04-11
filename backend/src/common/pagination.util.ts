export interface PaginationQuery {
  page?: number | string;
  limit?: number | string;
  search?: string;
  [key: string]: unknown;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function buildPagination(query: PaginationQuery): {
  skip: number;
  limit: number;
  page: number;
} {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
  return { skip: (page - 1) * limit, limit, page };
}

export function buildMeta(
  total: number,
  page: number,
  limit: number,
): PaginationMeta {
  return { total, page, limit, totalPages: Math.ceil(total / limit) };
}
