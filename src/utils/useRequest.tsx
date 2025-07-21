import { useEffect, useState, useCallback } from 'react';

interface UseRequestOptions<TParams extends any[]> {
  manual?: boolean; // 是否手动触发
  defaultParams?: TParams; // 自动请求时的默认参数
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useRequest<TData = any, TParams extends any[] = any[]>(
  service: (...args: TParams) => Promise<TData>,
  options: UseRequestOptions<TParams> = {}
) {
  const {
    manual = false,
    defaultParams = [] as unknown as TParams,
    onSuccess,
    onError,
  } = options;

  const [loading, setLoading] = useState(!manual);
  const [data, setData] = useState<TData | undefined>();
  const [error, setError] = useState<any>();
  const [params, setParams] = useState<TParams>(defaultParams);

  const run = useCallback(async (...args: TParams) => {
    setLoading(true);
    setError(undefined);
    setParams(args);
    try {
      const result = await service(...args);
      setData(result);
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, onSuccess, onError]);

  useEffect(() => {
    if (!manual) {
      run(...defaultParams);
    }
  }, []); // 只在首次渲染时触发

  return {
    loading,
    data,
    error,
    run,      // 手动调用
    params,
  };
}

