import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-500 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">

        <Link to={'/'} >
          <h1 className="text-white text-xl font-bold">
              Pokédex
          </h1>
        </Link>
        
        <div className='flex gap-2 items-center'>

          <a href="https://github.com/blockbusterandy" className="text-white mr-4 hover:underline hover:text-slate-900 text-md font-semibold" >GitHub</a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
