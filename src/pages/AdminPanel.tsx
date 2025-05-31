import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addPin, updatePin, deletePin } from '../store/slices/pinSlice';
import PinFormModal from '../components/PinFormModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const pins = useAppSelector(state => state.pins.pins);
  const users = useAppSelector(state => state.user.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPin, setEditingPin] = useState<any>(null);

  const handleAddPin = (pinData: any) => {
    const newPin = {
      ...pinData,
      id: `p${Date.now()}`,
      userId: 1, // Admin user
      likes: 0,
      savedBy: [],
      createdAt: new Date().toISOString(),
    };
    dispatch(addPin(newPin));
    toast({
      title: "Pin created",
      description: "New pin has been added successfully",
    });
  };

  const handleUpdatePin = (pinData: any) => {
    dispatch(updatePin({ ...editingPin, ...pinData }));
    toast({
      title: "Pin updated",
      description: "Pin has been updated successfully",
    });
  };

  const handleDeletePin = (pinId: string) => {
    if (window.confirm('Are you sure you want to delete this pin?')) {
      dispatch(deletePin(pinId));
      toast({
        title: "Pin deleted",
        description: "Pin has been deleted successfully",
      });
    }
  };

  const handleEditPin = (pin: any) => {
    setEditingPin(pin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPin(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-black dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold dark:text-white text-black">Admin Panel</h1>
            <p className="mt-2 dark:text-white text-black">Manage pins and content</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Pin
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="dark:text-white text-black">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-rose-50 rounded-lg">
                  <div className="text-2xl font-bold text-rose-600">{pins.length}</div>
                  <div className="text-sm text-gray-600">Total Pins</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{users.length}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {pins.reduce((acc, pin) => acc + pin.likes, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {pins.reduce((acc, pin) => acc + pin.savedBy.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Saves</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="dark:text-white text-black">All Pins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pins.map((pin, index) => {
                  const author = users.find(user => user.id === pin.userId);
                  return (
                    <motion.div
                      key={pin.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <img
                        src={pin.imageUrl}
                        alt={pin.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold dark:text-white text-black">{pin.title}</h3>
                        <p className="text-sm line-clamp-2 dark:text-white text-black">{pin.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs dark:text-white text-black">
                          <span>By {author?.name}</span>
                          <span>❤️ {pin.likes}</span>
                          <span>📌 {pin.savedBy.length} saves</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPin(pin)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePin(pin.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <PinFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingPin ? handleUpdatePin : handleAddPin}
        initialData={editingPin}
      />
    </div>
  );
};

export default AdminPanel;
