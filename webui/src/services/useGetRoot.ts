import { useEffect, useState } from "react";
import { useGet } from "./apiClient";

export const useGetRoot = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await useGet(`/`);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error occured");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};
