import React, { use, useState } from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ userInfo, onSearchNotes, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className='bg-white flex items-center justify-between px-4 sm:px-6 py-2 drop-shadow sticky top-0 z-50'>
      
      <h2 className='text-xl font-medium text-black py-2  xs:block'>
        Notes
      </h2>

      
      <div className="flex-1 flex justify-center px-2 sm:px-4">
        <div className="w-full max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={() => onSearchNotes(searchQuery)}
            onClearSearch={() => {
              setSearchQuery("");
              handleClearSearch();
            }}
          />
        </div>
      </div>

      
      <div className="flex-shrink-0">
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar
