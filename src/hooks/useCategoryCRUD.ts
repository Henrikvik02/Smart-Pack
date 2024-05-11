import { useState, useEffect } from 'react';
import { apiClient } from "../services/api-client";
import { Category } from "../services/object-service";

const useCategoryCRUD = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCategories = () => {
        setLoading(true);
        apiClient.get('/kategorier')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(`Fetching error: ${err.message}`);
                setLoading(false);
            });
    };

    const fetchCategory = (kategoriid: number) => {
        setLoading(true);
        return apiClient.get(`/kategorier/${kategoriid}`)
            .then(response => {
                setLoading(false);
                return response.data;
            })
            .catch(err => {
                setError(`Fetching single category error: ${err.message}`);
                setLoading(false);
                throw err;
            });
    };

    const createCategory = (category: Category) => {
        return apiClient.post('/kategorier', category)
            .then(response => {
                setCategories([...categories, response.data]);
            })
            .catch(err => {
                setError(`Create error: ${err.message}`);
                throw err;
            });
    };

    const updateCategory = (kategoriid: number, category: Category) => {
        return apiClient.put(`/kategorier/${kategoriid}`, category)
            .then(response => {
                setCategories(categories.map(cat => cat.kategoriid === kategoriid ? response.data : cat));
            })
            .catch(err => {
                setError(`Update error: ${err.message}`);
                throw err;
            });
    };

    const deleteCategory = (kategoriid: number) => {
        return apiClient.delete(`/kategorier/${kategoriid}`)
            .then(() => {
                setCategories(categories.filter(cat => cat.kategoriid !== kategoriid));
            })
            .catch(err => {
                setError(`Delete error: ${err.message}`);
                throw err;
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories, fetchCategory, createCategory, updateCategory, deleteCategory, loading, error };
};

export default useCategoryCRUD;
