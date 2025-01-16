import { QueryFunction } from "@tanstack/react-query";
import { Post } from "@/app/types/Post";

export const getPost: QueryFunction<Post, [_1: string, postId: string]>
  = async ({ queryKey }) => {
    const [_1, postId] = queryKey;
    const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,{
        next:{
            tags:['posts',postId]
        }
    }) 

    if(!res.ok) throw new Error("Failed to fetch post")

    return res.json();
}