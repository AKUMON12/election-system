import { useState, useCallback } from "react";

interface UseElectionOptions<T> {
    initialData?: T;
}

interface UseElectionReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    setData: (data: T) => void;
    refetch: () => void;
}

export function useElection<T>(
    fetchFn?: () => Promise<T>,
    options?: UseElectionOptions<T>
): UseElectionReturn<T> {
    const [data, setData] = useState<T | null>(options?.initialData ?? null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        if (!fetchFn) return;
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    return { data, loading, error, setData, refetch };
}