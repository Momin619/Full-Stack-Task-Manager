// components/Loading.jsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-[#00ffce] rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Loading<span className="animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
}
