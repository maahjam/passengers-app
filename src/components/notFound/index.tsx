const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-8">
          Page Not Found
        </p>
        <a
          href="/"
          className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded hover:bg-green-400 transition duration-300"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
