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
      const totalLoaded = allPages.reduce((acc, page) => acc + page.results.length, 0);
      if (!lastPage.next || totalLoaded >= lastPage.count) {
        return undefined;
      }

      return totalLoaded;
    },
  });
};
