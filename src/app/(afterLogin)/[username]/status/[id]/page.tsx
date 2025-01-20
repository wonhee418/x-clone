import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSinglePost } from "./_libs/getSinglePost";
import SinglePost from "./_component/SinglePost";
import Comments from "./_component/Comments";
import { getComments } from "./_libs/getComments";

interface Props {
  params: Promise<{ username: string; id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['posts', id], queryFn: getSinglePost})
  await queryClient.prefetchQuery({queryKey: ['posts', id, 'comments'], queryFn: getComments})

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <Comments id={id} />
      </HydrationBoundary>
    </div>
  );
}
