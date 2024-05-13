import { useCallback, useState } from 'react';
import { apiClient } from "../services/api-client";
import { CreateRuleTag, Rule, RuleTag } from "../services/object-service";

type UseRulesCRUDResult = {
  rules: Rule[];
  loading: boolean;
  error: string | null;
  fetchAllRules: () => Promise<void>;
  createRule: (rule: Rule) => Promise<void>;
  getRuleById: (id: number) => Promise<Rule | undefined>;
  getRulesByCategoryId: (kategoriid: number) => Promise<void>;
  updateRule: (rule: Rule) => Promise<void>;
  deleteRule: (id: number) => Promise<void>;
  linkRuleToItem: (tag: CreateRuleTag) => Promise<void>;
  unlinkRuleFromItem: (tagId: number) => Promise<void>;
  getRulesByItemId: (gjenstandid: number) => Promise<void>;
};

export const useRulesCRUD = (): UseRulesCRUDResult => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllRules = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<Rule[]>('/regelverker/read/');
      setRules(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rules');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRule = useCallback(async (rule: Rule) => {
    setLoading(true);
    try {
      const response = await apiClient.post<Rule>('/regelverker/', rule);
      setRules(prev => [...prev, response.data]);
    } catch (err: any) {
      setError(err.message || 'Failed to create rule');
    } finally {
      setLoading(false);
    }
  }, []);

  const getRuleById = useCallback(async (id: number): Promise<Rule | undefined> => {
    setLoading(true);
    try {
      const response = await apiClient.get<Rule>(`/regelverker/read/id/${id}`);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rule');
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRulesByCategoryId = useCallback(async (kategoriid: number) => {
    setLoading(true);
    try {
      const response = await apiClient.get<Rule[]>(`/regelverker/read/kategori/${kategoriid}`);
      setRules(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rules by category');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRule = useCallback(async (rule: Rule) => {
    setLoading(true);
    try {
      await apiClient.put<Rule>(`/regelverker/update/${rule.regelverkid}`, rule);
      setRules(prev => prev.map(r => r.regelverkid === rule.regelverkid ? rule : r));
    } catch (err: any) {
      setError(err.message || 'Failed to update rule');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteRule = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await apiClient.delete(`/regelverker/delete/${id}`);
      setRules(prev => prev.filter(r => r.regelverkid !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete rule');
    } finally {
      setLoading(false);
    }
  }, []);

  const linkRuleToItem = useCallback(async (tag: CreateRuleTag) => {
    try {
      await apiClient.post('/regelverktag/', tag);
    } catch (err: any) {
      setError(err.message || 'Failed to link rule to item');
    }
  }, []);

  const unlinkRuleFromItem = useCallback(async (tagId: number) => {
    try {
      await apiClient.delete(`/regelverktag/delete/${tagId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to unlink rule from item');
    }
  }, []);

  const getRulesByItemId = useCallback(async (gjenstandid: number) => {
    setLoading(true);
    try {
      const response = await apiClient.get<Rule[]>(`/regelverker/read/${gjenstandid}`);
      setRules(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rules for the item');
    } finally {
      setLoading(false);
    }
  }, []);

  return { rules, loading, error, fetchAllRules, createRule, getRuleById, getRulesByCategoryId, updateRule, deleteRule, linkRuleToItem, unlinkRuleFromItem, getRulesByItemId };
};
