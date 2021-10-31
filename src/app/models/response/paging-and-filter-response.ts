export interface PagingAndFilterResponse<Type> {
  success: boolean;
  errors: string;
  data: Array<Type>;
  totalItems: number;
  totalPages: number;
  pageSize: number;
  pageIndex: number;
}
