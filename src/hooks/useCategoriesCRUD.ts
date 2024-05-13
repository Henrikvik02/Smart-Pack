import { useState, useEffect } from 'react';
import { apiClient } from "../services/api-client";
import { Category, CreateCategoryData, UpdateCategoryData } from "../services/object-service";

const useCategoryCRUD = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCategories = () => {
        setLoading(true);
        apiClient.get('/kategorier/read/')
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
        return apiClient.get(`/kategorier/read/id/${kategoriid}`)
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

    const createCategory = async (categoryData: CreateCategoryData) => {
        try {
            const response = await apiClient.post<Category>('/kategorier/', categoryData);
            setCategories([...categories, response.data]);
        } catch (err: any) {
            setError(`Create error: ${err.message}`);
            throw err;
        }
    };
    
    const updateCategory = async (id: number, categoryData: UpdateCategoryData) => {
        try {
            const response = await apiClient.put<Category>(`/kategorier/update/${id}`, categoryData);
            setCategories(categories.map(cat => cat.kategoriid === id ? response.data : cat));
        } catch (err: any) {
            setError(`Update error: ${err.message}`);
            throw err;
        }
    };

    const deleteCategory = (kategoriid: number) => {
        return apiClient.delete(`/kategorier/delete/${kategoriid}`)
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
