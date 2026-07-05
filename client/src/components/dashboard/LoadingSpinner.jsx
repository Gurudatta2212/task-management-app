function LoadingSpinner() {
  return (
    <div className="flex justify-center py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
    </div>
  );
}

export default LoadingSpinner;