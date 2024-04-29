import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Category } from "../services/object-service";

// Utvidet interface for kategori

type UseCategoriesResult = [Category[], string];

const useCategories = (): UseCategoriesResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Category[]>("/kategorier")
      .then((res) => {
        // Sett logoPath for hver kategori basert på kategoriid
        const categoriesWithLogo = res.data.map(category => ({
          ...category,
          logoPath: `/icons/${category.kategoriid}.png`
        }));
        setCategories(categoriesWithLogo);
      })
      .catch((err) => setError(err.message));
  }, []);

  return [categories, error];
}

export default useCategories;
