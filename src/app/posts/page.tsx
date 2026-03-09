"use client"
import { getPosts } from '@/services/posts';
import { useUserStore, } from '@/store/user';
import { useQuery } from '@tanstack/react-query';

export default function Example() {
  const {username} = useUserStore();
  console.log("user", username)


    const { data, isPending, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getPosts(),
    });

    if (isPending) return <div>Carregando...</div>;
    
    if (isError) return <div>Ocorreu um erro ao buscar os dados</div>;
    if (!data || data.results.length === 0) {
        return <div>Nenhum exemplo foi encontrado</div>;
    }

    return (
        <div>
            <h1>All posts: {data.count}</h1>
            <p>seu user: {username}</p>
            <ul>

                {data.results.map((post) => (
                    <li key={post.id}>
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}