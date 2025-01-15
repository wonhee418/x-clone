"use client";
import  Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from '@/app/types/Post';
import {getSearchResult} from "@/app/(afterLogin)/search/_libs/getSearchResult";
import {useQuery} from "@tanstack/react-query";
type Props = {
  searchParams: { q: string, f?: string, pf?: string };
}
export default function SearchResult({ searchParams }: Props) {
  const {data} = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, Props['searchParams']]>({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 1000 * 60, // NOTE: 검색 기능과 같이 여러개의 키가 쉽게 쌓이 거나, 재사용되기 어려운 키값이라고 예상되는 경우에는 staletime과 gctime을 줄여 메모리 사용량을 줄이고 공간을 확보하며 캐시 관리를 해야한다.
    gcTime: 1000 * 60,
  });
  return data?.map((post) => (
    <Post key={post.postId} post={post} />
  ))
}