import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from './singlePost.module.css';
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {getPost} from "./_libs/getPost";
import { Post as IPost} from "@/app/types/Post";

interface Props {
  searchParams: Promise<{postId:string}>
}

export default async function SinglePost({ searchParams}:Props) {
  const {postId} = await searchParams;
  console.log('postId',postId)

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery<IPost, object, IPost, [string, string]>({
      queryKey: ['posts', postId],
      queryFn: getPost,
    })

    const dehydratedState = dehydrate(queryClient);
    const data = queryClient.getQueryData<IPost>(['posts', postId]);

    if(!data) return <div>Loading...</div>


  return (
    <div className={style.main}>
      <div className={style.header}>
        <BackButton/>
        <h3 className={style.headerTitle}>게시하기</h3>
      </div>
      <HydrationBoundary state={dehydratedState}>
      <Post noImage={true} post={data} />
      <CommentForm />
      <div>
        {/* <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>
      </HydrationBoundary>
    </div>
  )
}