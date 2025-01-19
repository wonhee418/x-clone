import style from './profile.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUser } from './_libs/getUser';
import { User } from '@/app/types/User';
import { getUserPosts } from './_libs/getUserPosts';


type Props={
  params: Promise<{username:string, postId?:string}>;
}

export default async function Profile({params}:Props) {
  const {username, postId} = await params;
  console.log('username',username);

  const queryClent = new QueryClient();
  await queryClent.prefetchQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ['user',username],
    queryFn: getUser,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 // NOTE: gcTime은 staleTime보다 커야함. inactive상태의 데이터는 gctime이 지나면 캐시가 삭제되기 때문에 작게 설정한다면 RQ를 사용해서 캐싱하는 의도와 맞지 않게 됨.
  })
  // await queryClent.prefetchQuery({
  //   queryKey: ['posts','user',username,postId],
  //   queryFn: getUserPosts,
  //   staleTime: 1000 * 60,
  //   gcTime: 1000 * 60 // NOTE: gcTime은 staleTime보다 커야함. inactive상태의 데이터는 gctime이 지나면 캐시가 삭제되기 때문에 작게 설정한다면 RQ를 사용해서 캐싱하는 의도와 맞지 않게 됨.
  // })
  const dehydratedState = dehydrate(queryClent);

  const user = queryClent.getQueryData<User>(['user',username]);

  if(!user) return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>프로필</h3>
      </div>
      
      <div className={style.userZone}>
        <div className={style.userImage}>
        </div>
        <div className={style.userName}>
          <div>@{username}</div>
        </div>
      </div>
      <div>
        <div>계정이 존재하지 않음</div>
        <small>다른 검색어를 시도해보세요.</small>
      </div>
    </>
  )

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id}/>
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
      <div>
        {/* <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </div>
      </HydrationBoundary>
    </main>
  )
}
