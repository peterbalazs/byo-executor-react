export interface TableInfo {
  name: string;
  displayName?: string;
}

export interface ColumnDefinition {
  name: string;
  type: string;
  nullable?: boolean;
}

export interface TableSchema {
  tableName: string;
  columns: ColumnDefinition[];
}

export interface TableRow {
  id: number | string;
  [key: string]: unknown;
}

export interface QueryResult {
  tableName: string;
  columns: ColumnDefinition[];
  rows: TableRow[];
  total?: number;
}

export interface NewLineRequest {
  tableName: string;
  data: Record<string, unknown>;
}

export interface UpdateLineRequest {
  tableName: string;
  id: number | string;
  data: Record<string, unknown>;
}

export interface DeleteLineRequest {
  tableName: string;
  id: number | string;
}

export interface OperationResult {
  success: boolean;
  message?: string;
  id?: number | string;
}
