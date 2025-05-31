
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Pin } from '../store/slices/pinSlice';
import { useAppSelector } from '../store/hooks';
import LikeButton from './LikeButton';
import SaveButton from './SaveButton';

interface PinCardProps {
  pin: Pin;
}

const PinCard = ({ pin }: PinCardProps) => {
  const users = useAppSelector(state => state.user.users);
  const author = users.find(user => user.id === pin.userId);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <Link to={`/pin/${pin.id}`} className="block relative">
        <div className="relative overflow-hidden">
          <img
            src={pin.imageUrl}
            alt={pin.title}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
              {pin.title}
            </h3>
            {author && (
              <Link 
                to={`/profile/${author.id}`}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-rose-600 transition-colors"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{author.name}</span>
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <LikeButton pinId={pin.id} likes={pin.likes} />
            <SaveButton pinId={pin.id} savedBy={pin.savedBy} />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {pin.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-block px-2 py-1 bg-rose-50 text-rose-700 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {pin.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{pin.tags.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PinCard;
