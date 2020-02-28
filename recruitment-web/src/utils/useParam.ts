import { useState, useCallback, useEffect } from "react";
import { v4 as uuid } from 'uuid';

interface IObjectParam {
  page?: number
  size?: number
  [key: string]: any
}

function useParam<T extends IObjectParam>(initParam = {} as T) {
  const [param, setParam] = useState<T>(initParam)
  const [fetchId, setFetchId] = useState(() => uuid())

  const isPage = param?.page !== undefined && param.size !== undefined

  const onPrevious = useCallback(() => {
    if (isPage) {
      setParam(p => ({
        ...p,
        page: p.page! - 1
      }))
    }
  }, [isPage])

  const onNext = useCallback(() => {
    if (isPage) {
      setParam(p => ({
        ...p,
        page: p.page! + 1
      }))
    }
  }, [isPage])

  const onRefresh = useCallback(() => {
    setParam(p => ({
      ...p,
    }))
  }, [])

  const setParamByKey = useCallback((key: string, value: any) => {
    setParam(p => ({
      ...p,
      [key]: value,
    }))
  }, [])

  useEffect(() => {
    setFetchId(() => uuid())
  }, [param])

  return {
    param,
    setParam,
    setParamByKey,
    onPrevious,
    onNext,
    onRefresh,
    fetchId,
  }
}
export default useParam