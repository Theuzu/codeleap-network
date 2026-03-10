# CodeLeap Network

A social feed application built as a frontend technical assessment. Users can create, edit, and delete posts in a shared real-time feed.

🔗Deploy: [https://codeleap-network-six.vercel.app/](https://codeleap-network-six.vercel.app/)

---

## Features

- **Username-based auth** — persistent login/logout via localStorage
- **Create posts** — submit a title and content to the shared feed
- **Edit & delete** — manage your own posts with confirmation modals
- **Infinite scroll** — automatically loads more posts as you scroll
- **Optimistic updates** — edits and deletes reflect instantly before server confirmation
- **Dark/light mode** — system-aware theme with manual toggle
- **Responsive** — works across mobile, tablet, and desktop
- **Animations** — smooth transitions on cards, modals, and UI interactions

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Server state | TanStack Query v5 |
| Client state | Zustand + persist |
| UI components | shadcn/ui + tweakcn |
| Styling | Tailwind CSS |
| Forms | React Hook Form |
| HTTP | Axios |
| Animations | Framer Motion |
| Dates | date-fns |
| Theme | next-themes |
| Icons | lucide-react |
| Deployment | Vercel |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── feed/
│   │   └── page.tsx              # Main feed page
│   ├── schemas/
│   │   ├── auth-schema.tsx       # Zod schema for auth form
│   │   └── post-schema.tsx       # Zod schema for post form
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Login page (redirects to /feed if logged in)
├── components/
│   ├── auth/
│   │   └── Sign-up-form.tsx      # Username login form
│   ├── feed/
│   │   ├── CreatePostForm.tsx
│   │   ├── Header.tsx            # Fixed navbar with theme toggle and logout
│   │   ├── PostCard.tsx
│   │   ├── PostForm.tsx
│   │   ├── PostList.tsx          # Infinite scroll list
│   │   ├── PostSkeleton.tsx
│   │   └── ScrollToTopButton.tsx
│   ├── Lenis/
│   │   └── SmoothScroll.tsx      # Lenis smooth scroll wrapper
│   ├── modals/
│   │   ├── DeleteModal.tsx
│   │   └── EditModal.tsx
│   └── ui/                       # shadcn/ui components
├── hooks/
│   ├── useCreatePost.ts          # useMutation + invalidate
│   ├── useDeletePost.ts          # useMutation + optimistic remove
│   ├── usePosts.ts               # useInfiniteQuery
│   └── useUpdatePost.ts          # useMutation + optimistic update
├── lib/
│   └── utils.ts
├── providers/
│   └── core-provider.tsx         # TanStack Query + theme providers
├── services/
│   ├── api.ts                    # Axios instance
│   └── posts.ts                  # Typed API functions
└── store/
    └── user.ts                   # Zustand + localStorage persist
```

---

## API

This project consumes the [CodeLeap careers API](https://dev.codeleap.co.uk/careers/).

| Method | Endpoint | Description |
|---|---|---|
| GET | `/careers/` | List posts (paginated) |
| POST | `/careers/` | Create a post |
| PATCH | `/careers/{id}/` | Update a post |
| DELETE | `/careers/{id}/` | Delete a post |