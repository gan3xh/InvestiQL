import { useState, useEffect } from 'react';
import { evidenceDB, QueryResult } from '../services/DatabaseService';

export function useDatabase(caseId: string) {
  const [isInvestigating, setIsLoading] = useState(true);
  const [investigationError, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function initializeDatabase() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Initialize SQL.js first
        await evidenceDB.initialize();
        
        // Add a small delay to ensure proper initialization
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Load the case-specific database
        await evidenceDB.loadCaseDatabase(caseId);
        
        if (mounted) {
          setIsInitialized(true);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to initialize database');
          setIsLoading(false);
        }
      }
    }

    if (caseId) {
      initializeDatabase();
    }

    return () => {
      mounted = false;
    };
  }, [caseId]);

  const runInvestigation = async (sql: string): Promise<QueryResult> => {
    if (!isInitialized) {
      throw new Error('Database not initialized');
    }

    try {
      return await evidenceDB.runInvestigation(sql);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Query execution failed');
    }
  };

  return {
    isInvestigating,
    investigationError,
    runInvestigation,
    isInitialized
  };
}