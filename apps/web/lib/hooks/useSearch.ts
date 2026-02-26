"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/lib/api";

export function useSearch(minLength = 2, debounceMs = 300) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);
    return () => clearTimeout(timerRef.current);
  }, [query, debounceMs]);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (debouncedQuery.length < minLength) return null;
      const res = await searchApi.search(debouncedQuery);
      return res.data;
    },
    enabled: debouncedQuery.length >= minLength,
  });

  return { query, setQuery, results: data, isLoading: isLoading && debouncedQuery.length >= minLength };
}
