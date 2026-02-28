import { apiClient } from './apiClient';
import type { NewLineRequest, OperationResult } from '../types';

export const createLine = async (request: NewLineRequest): Promise<OperationResult> => {
  const response = await apiClient.post<OperationResult>(
    `/api/operations/${request.tableName}`,
    request.data
  );
  return response.data;
};
