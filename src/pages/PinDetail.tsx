
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { deletePin } from '../store/slices/pinSlice';
import LikeButton from '../components/LikeButton';
import SaveButton from '../components/SaveButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PinDetail = () => {
  const { pinId } = useParams<{ pinId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const pin = useAppSelector(state => state.pins.pins.find(p => p.id === pinId));
  const users = useAppSelector(state => state.user.users);
  const currentUser = useAppSelector(state => state.user.currentUser);
  
  const author = pin ? users.find(user => user.id === pin.userId) : null;
  const savedByUsers = pin ? users.filter(user => pin.savedBy.includes(user.id)) : [];

  if (!pin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Pin not found</h1>
        <Link to="/" className="text-rose-600 hover:text-rose-700">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this pin?')) {
      dispatch(deletePin(pin.id));
      toast({
        title: "Pin deleted",
        description: "The pin has been successfully deleted",
      });
      navigate('/');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="md:grid md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {pin.title}
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {pin.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <LikeButton pinId={pin.id} likes={pin.likes} />
                  <SaveButton pinId={pin.id} savedBy={pin.savedBy} />
                </div>
              </div>

              {currentUser?.role === 'admin' && (
                <div className="flex space-x-2 mb-6">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete}>
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}

              {author && (
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Created by
                  </h3>
                  <Link 
                    to={`/profile/${author.id}`}
                    className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-3 transition-colors"
                  >
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{author.name}</p>
                      <p className="text-sm text-gray-600">{author.followers} followers</p>
                    </div>
                  </Link>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pin.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {savedByUsers.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                    Saved by ({savedByUsers.length})
                  </h3>
                  <div className="flex space-x-2 overflow-x-auto">
                    {savedByUsers.map(user => (
                      <Link
                        key={user.id}
                        to={`/profile/${user.id}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-rose-400 transition-all"
                          title={user.name}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PinDetail;
