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
export declare function buildPagination(query: PaginationQuery): {
    skip: number;
    limit: number;
    page: number;
};
export declare function buildMeta(total: number, page: number, limit: number): PaginationMeta;
