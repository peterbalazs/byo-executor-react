import { apiClient } from './apiClient';
import type { TableInfo, QueryResult } from '../types';

export const getTables = async (): Promise<TableInfo[]> => {
  const response = await apiClient.get<TableInfo[]>('/api/tables');
  return response.data;
};

export const queryTable = async (tableName: string): Promise<QueryResult> => {
  const response = await apiClient.get<QueryResult>(`/api/query/${tableName}`);
  return response.data;
};
