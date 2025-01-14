"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostsRecomends } from "../_libs/getPostsRecomends";
import { Post as IPost } from "@/app/types/Post";
import Post from "@/app/(afterLogin)/_component/Post";

export default function PostRecomends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recomended"],
    queryFn: () => getPostsRecomends(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 // gcTime은 staleTime보다 커야함.
  });

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
