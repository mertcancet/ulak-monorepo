export type Paginated<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
};
