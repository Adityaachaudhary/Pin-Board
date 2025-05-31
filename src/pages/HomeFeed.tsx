import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../store/hooks';
import PinCard from '../components/PinCard';
import SearchBar from '../components/SearchBar';
import TagFilterBar from '../components/TagFilterBar';

const HomeFeed = () => {
  const pins = useAppSelector(state => state.pins.pins);
  const filters = useAppSelector(state => state.filters);

  const filteredPins = useMemo(() => {
    return pins.filter(pin => {
      const matchesSearch = pin.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
                           pin.tags.some(tag => tag.toLowerCase().includes(filters.searchText.toLowerCase()));
      
      const matchesTags = filters.selectedTags.length === 0 ||
                         filters.selectedTags.some(tag => pin.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [pins, filters]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    pins.forEach(pin => pin.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, [pins]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Discover Inspiration</h1>
        <SearchBar />
        <TagFilterBar tags={allTags} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
      >
        {filteredPins.map((pin, index) => (
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

      {filteredPins.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pins found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </div>
  );
};

export default HomeFeed;
