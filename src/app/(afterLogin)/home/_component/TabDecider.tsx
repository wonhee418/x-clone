'use client';

import { useContext } from "react";
import { TabContext } from "./TabProvider";
import PostRecomends from "./PostRecomends";
import FollowingPosts from "./FollowingPosts";

export default function TabDecider() {
    const { tab } = useContext(TabContext)
    if(tab === 'rec') {
        return <PostRecomends/>
    } else {
        return <FollowingPosts/>
    }
}
