import { Skeleton } from "../ui/skeleton";

export default function ProjectDetailsSkeleton() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="w-full h-[400px] rounded-lg mb-8" />
        <Skeleton className="w-2/3 h-10 mb-6" />
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-10 rounded-full mr-3" />
          <div>
            <Skeleton className="w-32 h-5 mb-2" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
        <Skeleton className="w-full h-40" />
      </div>
    );
  }