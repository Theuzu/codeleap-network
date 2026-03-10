import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { PaginatedResponse, getPosts } from "@/services/posts";

export const usePosts = () => {
  return useInfiniteQuery<
    PaginatedResponse,
    Error,
    InfiniteData<PaginatedResponse>,
    string[],
    number
  >({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const currentTotalFetched = allPages.length * 10;
      if (!lastPage.next || currentTotalFetched >= lastPage.count) {
        return undefined;
      }

      return currentTotalFetched;
    },
  });
};
