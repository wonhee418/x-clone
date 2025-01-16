"use client"

import { useQuery } from '@tanstack/react-query';
import style from './followRecommend.module.css';
import { getFollowRecommends } from '../_libs/getFollowRecommends';

interface User {
  id: string;
  nickname: string;
  image: string;
}

export default function FollowRecommend() {
  const onFollow = () => {};

  const {data} = useQuery<User[]>({
    queryKey: ['user','followRecommends'],
    queryFn: () => getFollowRecommends(),
  });

  console.log('data',data);

  return data?.map((user)=>{
    return(
      <div className={style.container} key={user.id}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
    )
  })

}