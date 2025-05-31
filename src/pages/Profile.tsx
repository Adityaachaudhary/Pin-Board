
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../store/hooks';
import PinCard from '../components/PinCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const users = useAppSelector(state => state.user.users);
  const pins = useAppSelector(state => state.pins.pins);
  const currentUser = useAppSelector(state => state.user.currentUser);
  
  const user = users.find(u => u.id === parseInt(userId || '0'));
  const userPins = pins.filter(pin => pin.userId === parseInt(userId || '0'));
  const savedPins = pins.filter(pin => pin.savedBy.includes(parseInt(userId || '0')));

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="relative inline-block mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {user.role === 'admin' ? '👑' : '✨'}
            </span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
        <p className="text-gray-600 text-lg mb-4 max-w-md mx-auto">{user.bio}</p>
        
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="text-center">
            <div className="font-bold text-2xl text-gray-900">{userPins.length}</div>
            <div>Pins</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-gray-900">{savedPins.length}</div>
            <div>Saved</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-gray-900">{user.followers}</div>
            <div>Followers</div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="pins" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="pins">
            {isOwnProfile ? 'My Pins' : 'Pins'} ({userPins.length})
          </TabsTrigger>
          <TabsTrigger value="saved">
            {isOwnProfile ? 'Saved Pins' : 'Saved'} ({savedPins.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pins">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {userPins.map((pin, index) => (
              <motion.div
                key={pin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="break-inside-avoid"
              >
                <PinCard pin={pin} />
              </motion.div>
            ))}
          </motion.div>
          
          {userPins.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 text-6xl mb-4">📌</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pins yet</h3>
              <p className="text-gray-600">
                {isOwnProfile ? "Start creating your first pin!" : "This user hasn't created any pins yet."}
              </p>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {savedPins.map((pin, index) => (
              <motion.div
                key={pin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="break-inside-avoid"
              >
                <PinCard pin={pin} />
              </motion.div>
            ))}
          </motion.div>
          
          {savedPins.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 text-6xl mb-4">💾</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved pins</h3>
              <p className="text-gray-600">
                {isOwnProfile ? "Save pins you love to see them here!" : "This user hasn't saved any pins yet."}
              </p>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
