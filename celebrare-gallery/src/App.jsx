import React, { useReducer, useState, useMemo, useCallback } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { PhotoCard } from './components/PhotoCard';

// Initial state loader from localStorage
const initFavorites = () => {
  try {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage", error);
    return [];
  }
};

// Reducer function
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const photo = action.payload;
      const exists = state.some((fav) => fav.id === photo.id);
      let updatedState;
      
      if (exists) {
        updatedState = state.filter((fav) => fav.id !== photo.id);
      } else {
        updatedState = [...state, photo];
      }
      
      localStorage.setItem('favorites', JSON.stringify(updatedState));
      return updatedState;
    }
    default:
      return state;
  }
};

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [favorites, dispatch] = useReducer(favoritesReducer, [], initFavorites);
  
  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleFavorite = (photo) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photo });
  };

  // useCallback
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // useMemo
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-gray-600 mt-2">
            Favorites: {favorites.length} saved
          </p>

          
          <div className="mt-6 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by author name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
            />
          </div>
        </header>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md mx-auto text-red-700 rounded shadow-sm text-center">
            <p className="font-medium">Error loading photos</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            {filteredPhotos.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No photos found matching "{searchQuery}"</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPhotos.map((photo) => {
                  const isFavorite = favorites.some((fav) => fav.id === photo.id);
                  return (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      isFavorite={isFavorite}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}