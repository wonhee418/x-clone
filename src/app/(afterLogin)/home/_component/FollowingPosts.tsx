"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { Post as IPost } from "@/app/types/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getFollowingPosts } from "../_libs/getFollowingPosts";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function FollowingPosts() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "following"],
    queryFn: getFollowingPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60, // gcTime은 staleTime보다 커야함.
  });

  const {ref,inView} = useInView({
    threshold: 0.5,
    delay: 100,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage,fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} noImage={i % 2 === 0} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
