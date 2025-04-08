import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { motion } from 'framer-motion';
import "../../App.css";
import { useNavigate } from 'react-router-dom';
import Backimg from '../../images/library-869061_1280.jpg'
const SanchReg = () => {
  const [sanchFN, setFname] = useState(''); // initialize with an empty string
  const [sanchLN, setLname] = useState('');
  const [sanchMail, setEmail] = useState('');
  const [sanchPassword, setPassword] = useState('');
  const [sanchUtas, setsanchUtas] = useState('');
  const navigate = useNavigate();
  const SanchSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://library-kjji.onrender.com/api/lib/nomsanch', {
        sanchFN, sanchLN, sanchUtas, sanchPassword, sanchMail
      })
      .then(result =>{ 
        navigate('/SanchLogin');
      })
      .catch(err => {
        console.log(err.response?.data || err.message);
      alert("Бүртгүүлэх хүсэлт амжилтгүй боллоо.")}
    );
  };
  return (
    <motion.div initial={{opacity: 0, x: -60}}
    animate={{opacity: 1, x: 0}}
    transition={{duration: 0.6}}
    className='w-full flex flex-col justify-center h-[calc(100vh-48px)] bg-cover bg-center items-center font-sans'
    style={{ backgroundImage: `url(${Backimg})` }}>
    <div className="bg-neutral-100 shadow-md w-11/12 max-w-sm sm:w-80 md:w-96 text-sm sm:text-base md:text-lg pt-6 pb-6 px-4 rounded-2xl hover:shadow-lg flex flex-col gap-4 items-center justify-center">
      <h4>Номын санчийн бүртгэлийн хуудас</h4>
      <form onSubmit={SanchSubmit} className='flex flex-col w-fit gap-2'>
        <div className="email">
          <FontAwesomeIcon icon={faAddressBook} />
          <input placeholder="First name" type="text" onChange={(e) => setFname(e.target.value)} />
        </div>
        <div className="email">
          <FontAwesomeIcon icon={faAddressBook} />
          <input placeholder="Last name" type="text" onChange={(e) => setLname(e.target.value)} />
        </div>
        <div className="email">
          <FontAwesomeIcon icon={faAddressBook} />
          <input placeholder="Phone" type="text" onChange={(e) => setsanchUtas(e.target.value)} />
        </div>
        <div className="email">
          <FontAwesomeIcon icon={faAddressBook} />
          <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="pass">
          <FontAwesomeIcon icon={faLock} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='flex items-center justify-center p-0.5'>
          <button title="Бүртгүүлэх" className='bg-green-400 hover:bg-green-500 rounded-2xl text-center pl-1.5 pr-1.5 max-w-32 w-full' >Бүртгүүлэх</button>
        </div>
        </form>
    </div>
    </motion.div>
  );
};
export default SanchReg;
