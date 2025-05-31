
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTag, clearFilters } from '../store/slices/filterSlice';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TagFilterBarProps {
  tags: string[];
}

const TagFilterBar = ({ tags }: TagFilterBarProps) => {
  const dispatch = useAppDispatch();
  const selectedTags = useAppSelector(state => state.filters.selectedTags);

  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      {selectedTags.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(clearFilters())}
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <X className="w-4 h-4 mr-1" />
          Clear filters
        </Button>
      )}
      
      {tags.map((tag, index) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => dispatch(toggleTag(tag))}
              className={`transition-all ${
                isSelected 
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-transparent' 
                  : 'text-gray-700 border-gray-300 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50'
              }`}
            >
              #{tag}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TagFilterBar;
