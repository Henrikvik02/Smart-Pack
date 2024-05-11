import { useState, useEffect } from 'react';
import { apiClient } from '../services/api-client';
import { Item } from '../services/object-service';

type UseSearchedItemsResult = {
  items: Item[];
  isLoading: boolean;
  error: string | null;
};

const useSearchedItems = (query: string): UseSearchedItemsResult => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setItems([]);  // Clear items when the search query is empty
      return;
    }

    setIsLoading(true);
    apiClient.get<Item[]>(`/gjenstander/navn/${encodeURIComponent(query)}`)
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        setError('Error fetching items: ' + err.message);
        setIsLoading(false);
      });

  }, [query]);  // Dependency array includes query to re-run the effect when query changes

  return { items, isLoading, error };
};

export default useSearchedItems;
