
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { getPostsRecomends } from "../_libs/getPostsRecomends";
import TabDecider from "./TabDecider";

export default async function TabDeciderSuspense() {
    const queryClent = new QueryClient();
    await queryClent.prefetchInfiniteQuery({
    queryKey: ['posts','recomended'],
    queryFn: ({pageParam}) => getPostsRecomends({pageParam}),
    initialPageParam: 0,
  })
  const dehydratedState = dehydrate(queryClent);
  //NOTE: 하이드레이션은 SSR을 필요로 할때 사용하며 서버측에서 pre-fetching한 데이터를 클라이언트 측에서 물려받아 사용하는 원리이다.

    return(
        <HydrationBoundary state={dehydratedState}>
            <TabDecider/>
        </HydrationBoundary>
    )
}
