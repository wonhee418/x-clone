"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSinglePost } from "../_libs/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/app/types/Post";
import { getComments } from "../_libs/getComments";
type Props = {
  id: string;
  noImage?: boolean;
};
export default function Comments({ id }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);
  const { data: comments, error } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!post,
  });

  if(!post){
    return null;
  }
  
  if (error) {
    return (
      <div
        style={{
          height: 100,
          alignItems: "center",
          fontSize: 31,
          fontWeight: "bold",
          justifyContent: "center",
          display: "flex",
        }}
      >
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return comments?.map((comment) => {
    return <Post key={comment.postId} post={comment} noImage={true} />;
  });
}
