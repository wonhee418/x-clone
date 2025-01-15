import style from './search.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import SearchResult from './_component/SearchResult';

type Props = {
  searchParams: Promise<{ q: string, f?: string, pf?: string }>;
}
export default async function Search({ searchParams }: Props) {
  const { q,f,pf } = await searchParams; // Next 15 에서는 비동기로 변경됨.
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton/>
          </div>
          <div className={style.formZone}>
            <SearchForm q={q} f={f} pf={pf}/>
          </div>
        </div>
        <Tab/>
      </div>
      <div className={style.list}>
        <SearchResult searchParams={{q,f,pf}}/>
      </div>
    </main>
  )
}
