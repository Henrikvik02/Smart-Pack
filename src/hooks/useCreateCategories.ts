import { useState } from 'react';
import apiClient from '../services/api-client';
import { Category } from '../services/object-service';

interface UseCreateCategoryHook {
  createCategory: (category: Category, file: File) => void;
  isLoading: boolean;
  error: string | null;
}

const useCreateCategory = (): UseCreateCategoryHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = (category: Category, file: File) => {
    if (!file || file.type !== 'image/webp') {
      setError('Vennligst last opp en gyldig .webp-fil');
      return;
    }

    const formData = new FormData();
    formData.append('kategoriid', category.kategoriid.toString());
    formData.append('kategorinavn', category.kategorinavn);
    formData.append('kategoribeskrivelse', category.kategoribeskrivelse);
    formData.append('logo', file);

    setIsLoading(true);
    apiClient.post('/kategorier', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      setIsLoading(false);
      // her kan du legge til logikk for å håndtere responsdataen hvis nødvendig
    }).catch(err => {
      setError(err.message || 'En uventet feil oppstod');
      setIsLoading(false);
    });
  };

  return {
    createCategory,
    isLoading,
    error
  };
};

export default useCreateCategory;
