import { User } from "@/app/types/User";
import { QueryFunction } from "@tanstack/react-query";

export const getUser:  QueryFunction<User, [_1: string, _2: string]>
 = async ({queryKey}) => {
    const [_, username] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,{
      next:{
        tags:['user', username],
      },
      credentials: 'include',
      cache: 'no-store',
    })
  
    if(!res.ok) throw new Error("Failed to fetch user")
  
    return res.json();
  }