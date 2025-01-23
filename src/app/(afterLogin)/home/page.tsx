import style from './home.module.css';
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "../_component/TabContext";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import { dehydrate, HydrationBoundary, InfiniteData, QueryClient } from '@tanstack/react-query';
import { getPostsRecomends } from './_libs/getPostsRecomends';
import TabDecider from './_component/TabDecider';
import { Suspense } from 'react';
import Loading from './loading';


export default async function Home() {

  

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab/>
        <PostForm />
        <Suspense fallback={<Loading/>}>
          <TabDecider/>
        </Suspense>
      </TabProvider>
    </main>
  )
}
