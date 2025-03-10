import { Outlet } from 'react-router-dom';

const LayoutMain = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-2 sm:p-4 md:p-6 bg-blue-700 to-pink-600">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LayoutMain;

