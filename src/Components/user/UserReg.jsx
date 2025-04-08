import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faLock, faEnvelope,faPhone, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import axios from 'axios';
import "../../App.css";
import { useNavigate } from 'react-router-dom';
import Backimg from '../../images/library-869061_1280.jpg'
const UserReg = () => {
  const [Fname, setFname] = useState(''); // initialize with an empty string
  const [Lname, setLname] = useState('');
  const [oyutniCode, setOyutniCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [utas, setUtas] = useState('');
  const navigate = useNavigate();
  const UserSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://library-kjji.onrender.com/api/lib/user', {
        Fname, Lname, oyutniCode,email, utas, password
      })
      .then(result =>{ 
        console.log(result)
        if(result.data.success){
            alert("Амжиллтай нэвтэрлээ");
            navigate('/userHome');
        }
      })
      .catch(err => {
      alert("Бүртгүүлэх хүсэлт амжилтгүй боллоо.")}
    );
    };
return (
    <motion.div
    initial={{ opacity: 0, x: -60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
     className='w-full flex flex-col h-[calc(100vh-48px)] bg-cover bg-center justify-center items-center font-sans'
     style={{ backgroundImage: `url(${Backimg})` }}>
    <div className="bg-neutral-100 shadow-md w-11/12 max-w-sm sm:w-80 md:w-96 text-sm sm:text-base md:text-lg pt-6 pb-6 px-4 rounded-2xl hover:shadow-lg flex flex-col gap-4 items-center justify-center">
        <h4>Хэрэглэгчийн бүртгэлийн хуудас</h4>
    <form onSubmit={UserSubmit} className='flex flex-col w-fit gap-2'>
        <div className="email">
            <FontAwesomeIcon icon={faAddressBook} />
            <input placeholder="Таны овог" type="text" className='focus:outline-0' onChange={(e) => setFname(e.target.value)}/>
        </div>
        <div className="email">
            <FontAwesomeIcon icon={faAddressBook} />
            <input placeholder="Таны нэр" type="text" className='focus:outline-0' onChange={(e) => setLname(e.target.value)} />
        </div>
        <div className="email">
        <FontAwesomeIcon icon={faCircleUser} />
            <input placeholder="Оюутны код" type="text" className='focus:outline-0' onChange={(e) => setOyutniCode(e.target.value)} />
        </div>
        <div className="email">
        <FontAwesomeIcon icon={faEnvelope} />
            <input placeholder="И-мэйл" className='focus:outline-0' type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="email">
        <FontAwesomeIcon icon={faPhone} />
            <input placeholder="Утас" type="text" className='focus:outline-0' onChange={(e) => setUtas(e.target.value)} />
        </div>
        <div className="pass">
            <FontAwesomeIcon icon={faLock} />
            <input placeholder="Нууц үг" className='focus:outline-0' type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='flex items-center justify-center p-0.5'>
            <button title="Бүртгүүлэх" className='bg-green-400 hover:bg-green-500 rounded-2xl text-center pl-1.5 pr-1.5 max-w-32 w-fit' onClick={() => UserSubmit()}>Бүртгүүлэх</button>
        </div>
        </form>
       
    </div>
    </motion.div>
);
};
export default UserReg;
