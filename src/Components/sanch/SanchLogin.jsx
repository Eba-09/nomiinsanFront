import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
import "../../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faLock } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Backimg from '../../images/library-869061_1280.jpg'
const Login = () => {
    const [sanchMail, setEmail] = useState('');
    const [sanchPassword, setPassword] = useState('');
    const navigate = useNavigate();
    const { sanchLogin } = useContext(AuthContext);
    const logSubmit = (e) => {
      e.preventDefault();
      axios.post('https://library-kjji.onrender.com/api/lib/nomsanch/login', {sanchMail,sanchPassword})
        .then(result => {
          
          if (result.data.success) {
            alert("Амжилттай нэвтэрлээ");
            sanchLogin(result.data.token);
            navigate('/sanchHome')
          }
        })
        .catch(err => console.log(err))
    };
  return (
    
    <motion.div
    initial={{opacity: 0, x:-60}}
    animate={{opacity: 1, x:0}}
    transition={{duration: 0.6}}
    className='w-full flex flex-col h-[calc(100vh-48px)] bg-cover bg-center justify-center items-center font-sans'
    style={{ backgroundImage: `url(${Backimg})` }}
    >
      <div className="bg-neutral-100 shadow-md w-11/12 max-w-sm sm:w-80 md:w-96 text-sm sm:text-base md:text-lg pt-6 pb-6 px-4 rounded-2xl hover:shadow-lg flex flex-col gap-4 items-center justify-center">
      <h4>Номын санч нэвтрэх</h4>
      <form onSubmit={logSubmit}className='flex flex-col w-fit gap-2'>
      <div className="email">
        <FontAwesomeIcon icon={faAddressBook} />
        <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="pass">
      <FontAwesomeIcon icon={faLock} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='flex items-center justify-center p-0.5'>
        <button title="Нэвтрэх" className='bg-green-400 hover:bg-green-500 rounded-2xl text-center pl-1.5 pr-1.5 max-w-32 w-full'>Нэвтрэх</button>
        </div>
        </form>
        <div className='flex items-center justify-center p-0.5'>
        <button className='bg-green-400 hover:bg-green-500 rounded-2xl text-center pl-1.5 pr-1.5 max-w-32 w-full' onClick={() => navigate('/userLogin')}>Хэрэглэгчээр нэвтрэх</button>
        </div>
    </div>
    </motion.div>
  )
}
export default Login