
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleSavePin } from '../store/slices/pinSlice';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface SaveButtonProps {
  pinId: string;
  savedBy: number[];
}

const SaveButton = ({ pinId, savedBy }: SaveButtonProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.currentUser);
  
  const isSaved = currentUser ? savedBy.includes(currentUser.id) : false;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) return;
    
    dispatch(toggleSavePin({ pinId, userId: currentUser.id }));
    toast({
      title: isSaved ? "Removed from saved" : "Saved!",
      description: isSaved ? "Pin removed from your collection" : "Pin saved to your collection",
    });
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSave}
        className={`transition-colors ${
          isSaved 
            ? 'text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100' 
            : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
        }`}
      >
        <motion.span
          whileTap={{ scale: 1.2 }}
          className="text-lg"
        >
          {isSaved ? '📌' : '📍'}
        </motion.span>
      </Button>
    </motion.div>
  );
};

export default SaveButton;
