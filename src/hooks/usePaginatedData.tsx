import { useState, useEffect } from "react";
import type { Movie, MovieResponse } from "../types/api/movies.types";

interface UsePaginatedDataOptions {
    initialFilters: Record<string, string | number | null>;
    fetchData: (params: Record<string, string | number>) => Promise<MovieResponse>;
}

const usePaginatedData = ({ initialFilters, fetchData }: UsePaginatedDataOptions) => {
    const [data, setData] = useState<Movie[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<Record<string, string | number | null>>(initialFilters);

    const fetchAndSetData = async () => {
    setLoading(true);
    try {
        const result = await fetchData({  
        ...filters,
        page: currentPage });
        setData(result.Search || []);
        setTotalResults(parseInt(result.totalResults, 10));
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
    };

    const setFilter = (key: string, value: string | number) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [key]: value };
            return updatedFilters;
        });
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchAndSetData();
    }, [currentPage, filters]);

    return {
        data,
        totalResults,
        currentPage,
        loading,
        setPage: setCurrentPage,
        setFilter,
    };
};

export default usePaginatedData;
