"use client";

import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/app/types/Post";
import Post from "@/app/(afterLogin)/_component/Post";
import { getFollowingPosts } from "../_libs/getFollowingPosts";

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "following"],
    queryFn: () => getFollowingPosts(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 // gcTime은 staleTime보다 커야함.
  });

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
