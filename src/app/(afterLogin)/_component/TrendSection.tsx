"use client";

import style from './trendSection.module.css';
import Trend from "@/app/(afterLogin)/_component/Trend";
import { Trend as ITrend  } from '@/app/types/trend';
import { useQuery } from '@tanstack/react-query';
import {usePathname} from "next/navigation";
import { getTrends } from '../_libs/getTrends';
import { useSession } from 'next-auth/react';




export default function TrendSection() {
  const pathname = usePathname();
  const {data:session} = useSession();

  const { data:trends } = useQuery<ITrend[]>({
    queryKey: ["trends"],
    queryFn: () => getTrends(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60,
    enabled: !!session?.user
  });


  if (pathname === '/explore') return null;
  if(session?.user){
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
  return (
    <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          <div>트렌드를 조회할 수 없습니다.</div>
        </div>
      </div>
  )
}