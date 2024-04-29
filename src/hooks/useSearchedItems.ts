import { useState, useEffect } from 'react';
import apiClient from '../services/api-client';
import { Item } from '../services/object-service';

// Define the return type explicitly for clarity
type UseSearchedItemsResult = {
  items: Item[];
  isLoading: boolean;
  error: string | null;
};

const useSearchedItems = (query: string): UseSearchedItemsResult => {
  const [items, setItems] = useState<Item[]>([]); // Definerer state for items
  const [isLoading, setIsLoading] = useState(false); // Definerer state for isLoading
  const [error, setError] = useState<string | null>(null); // Definerer state for error

  useEffect(() => {
    console.log("Search query in hook:", query); // Logg den aktuelle søkestrengen
    if (!query) {
      setItems([]); // Tømmer items hvis søkestrengen er tom
      return;
    }

    setIsLoading(true); // Setter isLoading til true mens data lastes
    apiClient.get<Item[]>(`/gjenstander?gjenstandnavn=${encodeURIComponent(query)}`)
      .then(response => {
        console.log("Data received:", response.data); // Logg data mottatt fra serveren
        setItems(response.data); // Oppdaterer items med data mottatt
        setIsLoading(false); // Setter isLoading til false etter data er mottatt
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        setError(err.message); // Setter error hvis det oppstår en feil
        setIsLoading(false); // Setter isLoading til false hvis det oppstår en feil
      });

  }, [query]); // useEffect vil re-kjøre hver gang query endres

  return { items, isLoading, error };
};

export default useSearchedItems;
