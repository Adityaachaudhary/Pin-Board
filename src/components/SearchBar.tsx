
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchText } from '../store/slices/filterSlice';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector(state => state.filters.searchText);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mb-6"
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="Search pins, tags, or descriptions..."
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
        className="pl-10 h-12 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 bg-white/80 backdrop-blur-sm"
      />
    </motion.div>
  );
};

export default SearchBar;
