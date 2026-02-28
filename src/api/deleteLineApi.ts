import { apiClient } from './apiClient';
import type { DeleteLineRequest, OperationResult } from '../types';

export const deleteLine = async (request: DeleteLineRequest): Promise<OperationResult> => {
  const response = await apiClient.delete<OperationResult>(
    `/api/operations/${request.tableName}/${request.id}`
  );
  return response.data;
};
