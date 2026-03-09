import api from "./api";

export type Post = {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

export type PaginatedResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Post[]
}

export type CreatePostPayload = {
  username: string
  title: string
  content: string
}

export type UpdatePostPayload = {
  title: string
  content: string
}

// GET - infinite scroll
export const getPosts = async (offset = 0, limit = 10): Promise<PaginatedResponse> => {
  const { data } = await api.get<PaginatedResponse>('/', {
    params: { limit, offset },
  })
  console.log(data)
  return data
}

export const createPost = async (payload: CreatePostPayload): Promise<Post> => {
  const { data } = await api.post<Post>('/', payload)
  return data
}

export const updatePost = async (id: number, payload: UpdatePostPayload): Promise<Post> => {
  const { data } = await api.patch<Post>(`/${id}/`, payload)
  return data
}

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/${id}/`)
}