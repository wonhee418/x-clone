"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostsRecomends } from "../_libs/getPostsRecomends";
import { Post as IPost } from "@/app/types/Post";
import Post from "@/app/(afterLogin)/_component/Post";

export default function PostRecomends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recomended"],
    queryFn: () => getPostsRecomends(),
  });

  console.log("postRecomends", data);

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
