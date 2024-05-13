import { useEffect, useState } from "react";
import { apiClient } from "../services/api-client";
import { Category } from "../services/object-service";

// Extends the interface for usability
interface CategoryWithLogo extends Category {
    logoPath?: string;
}

// Define the return type for the hook
type UseCategoriesResult = {
    categories: CategoryWithLogo[];
    isLoading: boolean;
    error: string;
};

const useCategories = (): UseCategoriesResult => {
    const [categories, setCategories] = useState<CategoryWithLogo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        apiClient.get<Category[]>("/kategorier/read/")
        .then((res) => {
            const categoriesWithLogo = res.data.map(category => ({
                ...category,
                logoPath: `/icons/${category.kategoriid}.png`
            }));
            setCategories(categoriesWithLogo);
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setIsLoading(false);
        });
    }, []);

    return { categories, isLoading, error };
}

export default useCategories;
