import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "../_component/TabContext";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getPostsRecomends } from './_libs/getPostsRecomends';
import TabDecider from './_component/TabDecider';


export default async function Home() {

  const queryClent = new QueryClient();
  await queryClent.prefetchQuery({
    queryKey: ['posts','recomended'],
    queryFn: () => getPostsRecomends(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 // NOTE: gcTime은 staleTime보다 커야함. inactive상태의 데이터는 gctime이 지나면 캐시가 삭제되기 때문에 작게 설정한다면 RQ를 사용해서 캐싱하는 의도와 맞지 않게 됨.
  })
  const dehydratedState = dehydrate(queryClent);

  //NOTE: 하이드레이션은 SSR을 필요로 할때 사용하며 서버측에서 pre-fetching한 데이터를 클라이언트 측에서 물려받아 사용하는 원리이다.

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}> 
      <TabProvider>
        <Tab/>
        <PostForm />
        <TabDecider/>
      </TabProvider>
      </HydrationBoundary>
    </main>
  )
}
