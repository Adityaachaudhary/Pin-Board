import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentUser } from '../store/slices/userSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.user.users);

  const handleUserSelect = (user: any) => {
    dispatch(setCurrentUser(user));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-white font-bold text-2xl">P</span>
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Welcome to Pinboard
          </h1>
          <p className="text-gray-600">Select your profile to continue</p>
        </div>

        <div className="space-y-4">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="border-rose-100 hover:border-rose-300 transition-all duration-200 hover:shadow-lg cursor-pointer">
                <CardContent className="p-6" onClick={() => handleUserSelect(user)}>
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-black dark:text-white">{user.name}</h3>
                      <p className="text-sm text-black dark:text-white">{user.email}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        user.role === 'admin' 
                          ? 'bg-rose-100 text-rose-800 dark:text-white dark:bg-rose-700' 
                          : 'bg-gray-100 text-gray-800 dark:text-white dark:bg-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          Discover and save your favorite inspirations
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
