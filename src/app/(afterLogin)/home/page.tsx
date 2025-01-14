import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
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
