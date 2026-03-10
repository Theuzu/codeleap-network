import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function PostSkeleton() {
  return (
    <Card className="w-full rounded-2xl border pt-0 overflow-hidden animate-pulse">
      {/* Header */}
      <CardHeader className="bg-primary opacity-60 px-5 py-4 flex items-center justify-between h-14">
        <CardTitle className="h-4 w-48 text-white opacity-30  truncate-pr-4 rounded" />
      </CardHeader>

      {/* Body */}
      <CardContent className="px-6 py-4 flex flex-col gap-3">
        {/* Username + timestamp */}
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-24 bg-muted-foreground rounded" />
          <div className="h-3.5 w-20 bg-muted-foreground rounded" />
        </div>

        {/* Content lines */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}