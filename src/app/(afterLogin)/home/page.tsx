import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostRecomends from './_component/PostRecomends';
import { getPostsRecomends } from './_libs/getPostsRecomends';


export default async function Home() {

  const queryClent = new QueryClient();
  await queryClent.prefetchQuery({
    queryKey: ['posts','recomended'],
    queryFn: () => getPostsRecomends(),
  })
  const dehydratedState = dehydrate(queryClent);


  const posts = await queryClent.getQueryData(['posts','recomended'])
  console.log(posts)

  


  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}> 
      <TabProvider>
        <Tab/>
        <PostForm />
        <PostRecomends/>
      </TabProvider>
      </HydrationBoundary>
    </main>
  )
}
