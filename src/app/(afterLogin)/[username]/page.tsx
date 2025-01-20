import style from './profile.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getUser } from './_libs/getUser';
import { User } from '@/app/types/User';
import { getUserPosts } from './_libs/getUserPosts';
import UserPosts from './_components/UserPosts';
import UserInfo from './_components/UserInfo';


type Props={
  params: Promise<{username:string, postId?:string}>;
}

export default async function Profile({params}:Props) {
  const {username, postId} = await params;
  console.log('username',username);

  const queryClent = new QueryClient();
  await queryClent.prefetchQuery({
    queryKey: ['user',username],
    queryFn: getUser,
  })
  await queryClent.prefetchQuery({
    queryKey: ['posts','user', 'recomends'],
    queryFn: getUserPosts,
  })
  const dehydratedState = dehydrate(queryClent);


  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
      <UserInfo username={username}/>
      <div>
        <UserPosts username={username} />
      </div>
      </HydrationBoundary>
    </main>
  )
}
