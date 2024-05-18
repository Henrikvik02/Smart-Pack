import { useCallback, useState } from 'react';
import { apiClient } from "../services/api-client";
import { CreateRule, CreateRuleTag, Rule, RuleTag, UpdateRule } from "../services/object-service";

type UseRulesCRUDResult = {
  rules: Rule[];
  loading: boolean;
  error: string | null;
  fetchAllRules: () => Promise<void>;
  createRule: (ruledata: CreateRule) => Promise<void>;
  getRuleById: (id: number) => Promise<Rule | undefined>;
  getRulesByCategoryId: (kategoriid: number) => Promise<Rule[]>;
  updateRule: (regelverkid: number, ruleData: UpdateRule) => Promise<void>;
  deleteRule: (id: number) => Promise<void>;
  linkRuleToItem: (tag: CreateRuleTag) => Promise<void>;
  unlinkRuleFromItem: (it: number, rul: number) => Promise<void>;
  unlinkRuleFromItemWithItemid: (it: number,) => Promise<void>;
  unlinkRuleFromItemWithRuleid: (it: number,) => Promise<void>;
  getRulesByItemId: (gjenstandid: number) => Promise<Rule[]>;
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

  const createRule = useCallback(async (ruledata: CreateRule) => {
    setLoading(true);
    try {
      const response = await apiClient.post<Rule>('/regelverker/', ruledata);
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

  const getRulesByCategoryId = useCallback(async (kategoriid: number): Promise<Rule[]> => {
    setLoading(true);
    try {
      const response = await apiClient.get<Rule[]>(`/regelverker/read/kategori/${kategoriid}`);
      setRules(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rules by category');
      return [];  // Returnerer en tom array om det er feil
    } finally {
      setLoading(false);
    }
  }, []);
  

  const updateRule = useCallback(async (regelverkid: number, ruleData: UpdateRule) => {
    setLoading(true);
    try {
      await apiClient.put<Rule>(`/regelverker/update/${regelverkid}`, ruleData);
      setRules(prev => prev.map(rule => rule.regelverkid === regelverkid ? { ...rule, ...ruleData } : rule));
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

  const unlinkRuleFromItem = useCallback(async (it:number, rul:number) => {
    try {
        await apiClient.delete('/regelverktag/delete', {
            data: { it, rul }
        });
    } catch (err) {
        setError(error || 'Failed to unlink rule from item');
    }
  }, []);

  const unlinkRuleFromItemWithItemid = useCallback(async (gjenstandid: number) => {
    try {
        await apiClient.delete('/regelverktag/item/delete', {
            data: { gjenstandid }
        });
    } catch (err: any) {
        setError(err.message || 'Failed to unlink rule from item');
    }
  }, []);

  const unlinkRuleFromItemWithRuleid = useCallback(async (regelverkid: number) => {
    try {
        await apiClient.delete('/regelverktag/rule/delete', {
            data: { regelverkid }
        });
    } catch (err: any) {
        setError(err.message || 'Failed to unlink rule from item');
    }
  }, []);
  

  const getRulesByItemId = useCallback(async (it: number): Promise<Rule[]> => {
    setLoading(true);
    try {
      const response = await apiClient.get<Rule[]>(`/regelverker/read/${it}`);
      return response.data; // returnerer en liste av regler
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rules for the item');
      return []; // returnerer tom liste ved feil
    } finally {
      setLoading(false);
    }
}, [apiClient, setLoading, setError]);
  

  return { rules, loading, error, fetchAllRules, createRule, getRuleById, getRulesByCategoryId, updateRule, deleteRule, linkRuleToItem, unlinkRuleFromItem, unlinkRuleFromItemWithItemid, getRulesByItemId, unlinkRuleFromItemWithRuleid };
};
