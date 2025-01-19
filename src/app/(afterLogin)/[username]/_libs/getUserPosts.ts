import { Post } from "@/app/types/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getUserPosts:  QueryFunction<Post, [_1: string, _2: string, _3: string]>
 = async ({queryKey}) => {
    const [_, username, postId] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}/posts/${postId}`,{
      next:{
        tags:['user', 'posts', username, postId],
      },
      credentials: 'include',
      cache: 'no-store',
    })
  
    if(!res.ok) throw new Error("Failed to fetch user")
  
    return res.json();
  }