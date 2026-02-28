import { apiClient } from './apiClient';
import type { UpdateLineRequest, OperationResult } from '../types';

export const updateLine = async (request: UpdateLineRequest): Promise<OperationResult> => {
  const response = await apiClient.put<OperationResult>(
    `/api/operations/${request.tableName}/${request.id}`,
    request.data
  );
  return response.data;
};
