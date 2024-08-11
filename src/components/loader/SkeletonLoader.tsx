

export default function SkeletonLoader() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top loading bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 animate-pulse"></div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar skeleton */}
        <div className="w-[19rem] bg-white shadow-lg p-4 space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Main content skeleton */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>

            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                </div>
              ))}
            </div>

            <div className="h-60 bg-gray-200 rounded-lg animate-pulse"></div>

            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}