
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearCurrentUser } from '../store/slices/userSlice';
import { User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.currentUser);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(clearCurrentUser());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-rose-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">P</span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                Pinboard
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`transition-colors ${
                  location.pathname === '/' 
                    ? 'text-rose-600 font-medium' 
                    : 'text-gray-600 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400'
                }`}
              >
                Home
              </Link>
              {currentUser?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`transition-colors ${
                    location.pathname === '/admin' 
                      ? 'text-rose-600 font-medium' 
                      : 'text-gray-600 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400'
                  }`}
                >
                  Admin
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden md:block dark:text-gray-200">{currentUser?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-rose-100 dark:border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${currentUser?.id}`} className="flex items-center dark:text-gray-200 dark:hover:bg-gray-700">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {currentUser?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center dark:text-gray-200 dark:hover:bg-gray-700">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600 dark:text-red-400 dark:hover:bg-gray-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
