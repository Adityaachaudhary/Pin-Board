
import { motion } from 'framer-motion';
import { useAppDispatch } from '../store/hooks';
import { likePin } from '../store/slices/pinSlice';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface LikeButtonProps {
  pinId: string;
  likes: number;
}

const LikeButton = ({ pinId, likes }: LikeButtonProps) => {
  const dispatch = useAppDispatch();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(likePin(pinId));
    toast({
      title: "Liked!",
      description: "You liked this pin",
    });
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className="text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
      >
        <motion.span
          whileTap={{ scale: 1.2 }}
          className="text-lg mr-1"
        >
          ❤️
        </motion.span>
        {likes}
      </Button>
    </motion.div>
  );
};

export default LikeButton;
