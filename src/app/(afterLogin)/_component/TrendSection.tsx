"use client";

import style from './trendSection.module.css';
import Trend from "@/app/(afterLogin)/_component/Trend";
import { Trend as ITrend  } from '@/app/types/trend';
import { useQuery } from '@tanstack/react-query';
import {usePathname} from "next/navigation";
import { getTrends } from '../_libs/getTrends';




export default function TrendSection() {
  const pathname = usePathname();

  const { data:trends } = useQuery<ITrend[]>({
    queryKey: ["trends"],
    queryFn: () => getTrends(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 
  });

  if (pathname === '/explore') return null;
  
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        {trends?.map((trend:ITrend)=>{
          return <Trend key={trend.tagId} item={trend} />
        })}
      </div>
    </div>
  )
}