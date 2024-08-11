
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LoadingCard: React.FC = () => {
  return (
    <Card className="w-full h-full flex flex-col rounded-lg shadow-md transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-md"></div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
        <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
      </CardContent>
    </Card>
  );
};

export default LoadingCard;
