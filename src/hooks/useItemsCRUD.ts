import { useState, useCallback } from 'react';
import { apiClient } from "../services/api-client";
import { Item } from "../services/object-service";

type UseItemsResult = {
    items: Item[];
    loading: boolean;
    error: string | null;
    loadAllItems: () => Promise<void>;
    createItem: (item: Item) => Promise<void>;
    readItem: (id: number) => Promise<Item | undefined>;
    readItemsByCategoryId: (kategoriid: number) => Promise<void>;
    updateItem: (item: Item) => Promise<void>;
    deleteItem: (id: number) => Promise<void>;
};

export const useItems = (): UseItemsResult => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadAllItems = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<Item[]>('/gjenstander/read/');
            setItems(response.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch all items');
        } finally {
            setLoading(false);
        }
    }, []);

    const createItem = useCallback(async (item: Item) => {
        setLoading(true);
        try {
            const response = await apiClient.post<Item>('/gjenstander/', item);
            setItems(prevItems => [...prevItems, response.data]);
        } catch (err: any) {
            setError(err.message || 'Failed to create item');
        } finally {
            setLoading(false);
        }
    }, []);

    const readItemsByCategoryId = useCallback(async (kategoriid: number) => {
        setLoading(true);
        try {
            const response = await apiClient.get<Item[]>(`/gjenstander/read/kategori/${kategoriid}`);
            setItems(response.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch items by category');
        } finally {
            setLoading(false);
        }
    }, []);

    const readItem = useCallback(async (id: number): Promise<Item | undefined> => {
        setLoading(true);
        try {
            const response = await apiClient.get<Item>(`/gjenstander/read/id/${id}`);
            return response.data;
        } catch (err: any) {
            setError(err.message || 'Failed to fetch item');
            return undefined;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateItem = useCallback(async (item: Item) => {
        setLoading(true);
        try {
            await apiClient.put<Item>(`/gjenstander/update/${item.gjenstandid}`, item);
            setItems(prevItems => prevItems.map(i => i.gjenstandid === item.gjenstandid ? item : i));
        } catch (err: any) {
            setError(err.message || 'Failed to update item');
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteItem = useCallback(async (id: number) => {
        setLoading(true);
        try {
            await apiClient.delete(`/gjenstander/delete/${id}`);
            setItems(prevItems => prevItems.filter(item => item.gjenstandid !== id));
        } catch (err: any) {
            setError(err.message || 'Failed to delete item');
        } finally {
            setLoading(false);
        }
    }, []);

    return { items, loading, error, loadAllItems, createItem, readItem, readItemsByCategoryId, updateItem, deleteItem };
};