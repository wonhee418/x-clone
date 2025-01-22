import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "../_component/TabContext";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import { dehydrate, HydrationBoundary, InfiniteData, QueryClient } from '@tanstack/react-query';
import { getPostsRecomends } from './_libs/getPostsRecomends';
import TabDecider from './_component/TabDecider';
import { Post } from '@/app/types/Post';


export default async function Home() {

  const queryClent = new QueryClient();
  await queryClent.prefetchInfiniteQuery({
    queryKey: ['posts','recomended'],
    queryFn: ({pageParam}) => getPostsRecomends({pageParam}),
    initialPageParam: 0,
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
