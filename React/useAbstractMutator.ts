import { useState } from "react";

type ValueType = {
  data: any;
  status: any;
  message: any;
};

export default function useAbstractMutator(mutateFunction) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<ValueType>({
    data: null,
    status: {},
    message: null,
  });
  const [error, setError] = useState(null);

  async function mutate(mutateParams, options?) {
    setLoading(true);

    const { res, err } = await mutateFunction(mutateParams, options);

    setValue(res || { data: null, status: {} });
    setError(err ? err.response : null);
    setLoading(false);
  }

  return {
    data: error ? null : value.data,
    status: error ? error.status : value.status,
    message: error ? error.data.message : value.message,
    error,
    mutate,
    loading,
  };
}
