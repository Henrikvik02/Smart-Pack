import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Item } from "../services/object-service";

type UseItemsResult = [Item[], string, boolean];

const useItems = (kategoriid: number | null, query: string = ""): UseItemsResult => {
  const [gjenstander, setGjenstander] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!kategoriid) return; // If no category ID is set, no API call is made

    const params = {
      kategoriid: kategoriid,
      ...(query && { q: query }) // Include query parameter if it exists
    };

    setIsLoading(true);
    apiClient
      .get<Item[]>(`/gjenstander`, { params })
      .then((res) => {
        setGjenstander(res.data);
        setError(""); // Clear any existing errors on successful fetch
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Cleanup function to potentially cancel the request if needed
    return () => {
      setIsLoading(false); // Ensure loading state is reset when component unmounts or dependencies change
    };
  }, [kategoriid, query]); // Add query as a dependency

  return [gjenstander, error, isLoading];
};

export default useItems;
