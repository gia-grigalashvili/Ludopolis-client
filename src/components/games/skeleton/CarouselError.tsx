interface CarouselErrorProps {
  error: Error;
}

export default function CarouselError({ error }: CarouselErrorProps) {
  return (
    <div className="min-w-0 w-full">
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="transition-all border border-red-600 bg-red-900/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white min-h-[400px] flex flex-col items-center justify-center">
            <div className="text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold mb-4 text-red-100">
                Something went wrong
              </h2>
              <p className="text-red-200 mb-6 max-w-md">
                We couldn't load the related products. Please try refreshing the
                page.
              </p>
              <p className="text-sm text-red-300 font-mono bg-red-800/30 p-3 rounded-md">
                Error: {error?.message || "Unknown error occurred"}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
