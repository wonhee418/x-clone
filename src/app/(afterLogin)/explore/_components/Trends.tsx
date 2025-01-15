'use client';

import { useQuery } from "@tanstack/react-query"
import { getTrends } from "../../_libs/getTrends"
import Trend from "../../_component/Trend"
import { Trend as ITrend } from "@/app/types/trend"

export default function Trends() {
    const {data : trends} = useQuery<ITrend[]>({
        queryKey: ["trends"],
        queryFn: () => getTrends(),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60,
    })

    return trends?.map((trend:ITrend) => <Trend key={trend.tagId} item={trend} />)
}