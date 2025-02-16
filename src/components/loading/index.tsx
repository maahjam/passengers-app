const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-green-600" />
      <p className="ml-2 font-medium text-zinc-600">Loading ...</p>
    </div>
  );
};

export default Loading;
