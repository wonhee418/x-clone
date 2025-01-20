'use client'

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserPosts } from "../_libs/getUserPosts"
import { Post as IPost } from "@/app/types/Post";
import Post from "../../_component/Post";
import { User } from "@/app/types/User";

type Props = {
    username: string;
}

export default function UserPosts({username}:Props) {

    const {data} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
        queryKey: ['posts', 'user', username],
        queryFn: getUserPosts,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60,
    })
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>(['user', username]);

    if(user){
        return data?.map((post)=>{
            return <Post key={post.postId} post={post} />
        })
    }
    

}