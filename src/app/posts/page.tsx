"use client"
import { getPosts } from '@/services/posts';
import { useQuery } from '@tanstack/react-query';

export default function Example() {
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