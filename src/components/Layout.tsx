import {Link, Outlet} from 'react-router-dom';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <nav className="bg-opacity-30 fixed top-0 left-0 flex w-full items-center justify-between bg-white px-6 py-3 shadow-md backdrop-blur-md">
        <h1 className="text-2xl font-bold text-black">Media Sharing App</h1>
        <div className="flex space-x-6">
          <Link className="text-black hover:text-gray-300" to="/Home">
            Home
          </Link>
          {user ? (
            <>
              <Link className="text-black hover:text-gray-300" to="/profile">
                Profile
              </Link>
              <Link className="text-black hover:text-gray-300" to="/upload">
                Upload
              </Link>
              <Link className="text-black hover:text-red-500" to="/logout">
                Logout
              </Link>
            </>
          ) : (
            <Link className="text-black hover:text-green-500" to="/">
              Login
            </Link>
          )}
        </div>
      </nav>
      {/* Content */}
      <main className="container mx-auto flex-grow p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black p-4 text-center text-white">
        &copy; 2025 Media Sharing App
      </footer>
    </div>
  );
};

export default Layout;
