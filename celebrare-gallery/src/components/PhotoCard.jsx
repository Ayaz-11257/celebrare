import React from 'react';

export function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between border border-gray-100">
      <div className="relative aspect-square w-full bg-gray-200 overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/400/400`}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex items-center justify-between gap-2">
        <p className="font-semibold text-gray-800 text-sm truncate">
          {photo.author}
        </p>
        <button
          onClick={() => onToggleFavorite(photo)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-colors duration-200 ${
              isFavorite
                ? "text-red-500 fill-current"
                : "text-gray-400 stroke-current fill-none hover:text-red-400"
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}