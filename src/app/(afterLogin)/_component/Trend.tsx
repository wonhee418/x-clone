import Link from "next/link";
import style from './trend.module.css';
import { Trend as ITrend } from '@/app/types/trend';

type TrendProps = {
  item:ITrend
}

export default function Trend({item} : TrendProps) {
  return (
    <Link href={`/search?q=${item.title}`} className={style.container}>
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{item.title}</div>
      <div className={style.count}>{item.count.toLocaleString()} posts</div>
    </Link>
  )
}