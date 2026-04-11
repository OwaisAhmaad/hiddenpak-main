import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: Record<string, any>;
}
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(_ctx: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>>;
}
