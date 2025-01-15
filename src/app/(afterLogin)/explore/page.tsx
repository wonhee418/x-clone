import style from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getTrends } from "../_libs/getTrends";
import Trends from "./_components/Trends";

export default async function Home() {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["trends"],
    queryFn: () => getTrends(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        <HydrationBoundary state={dehydratedState}>
          <Trends />
        </HydrationBoundary>
      </div>
    </main>
  )
}
