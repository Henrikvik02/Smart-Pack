import { useEffect, useState } from "react";
import { apiClient } from "../services/api-client";
import { Item } from "../services/object-service";

// Extends to include isLoading for better UI handling
type UseItemsResult = {
  items: Item[];
  error: string;
  isLoading: boolean;
};

const useItems = (kategoriid: number | null): UseItemsResult => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (kategoriid === null) {
      setItems([]); // Optionally clear items when no category is selected
      return; // Exit if no category ID is provided
    }

    setIsLoading(true);
    apiClient.get<Item[]>(`/gjenstander/read/kategori/${kategoriid}`) // Adjusted to use dynamic segment
      .then(response => {
        setItems(response.data); // Update items from the response
        setError(""); // Reset error state on successful fetch
      })
      .catch(error => {
        setError(error.response?.data?.message || "Unable to fetch items"); // Use error message from response if available
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading state is reset
      });

    // Cleanup function to handle component unmount
    return () => {
      setIsLoading(false); // Reset loading state when dependencies change
    };
  }, [kategoriid]); // Dependency on kategoriid only

  return { items, error, isLoading };
};

export default useItems;
