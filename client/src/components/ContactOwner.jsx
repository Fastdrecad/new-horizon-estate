import { useState } from 'react';
import Contact from './Contact';

const ContactOwner = ({ isOpen, setIsOpen, listing }) => {
  return (
    isOpen && (
      <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/50 z-50'>
        <div className='bg-white p-8 m-3 w-96 rounded-md text-center'>
          <Contact listing={listing} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    )
  );
};

export default ContactOwner;
