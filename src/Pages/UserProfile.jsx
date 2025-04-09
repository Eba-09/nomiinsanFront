import React,{useState, useEffect} from "react"
import { CircleUser } from 'lucide-react';
import { useContext } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { AuthContext } from '../Components/AuthContext';
import { NavLink } from "react-router-dom";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import ConImage from '../images/me.jpg'
function getUserInfo () {
const [userData, setuserData] = useState([]);
 const [zahtoo, setzahtoo] = useState(null);
 const [zeeltoo, setZeeltoo] = useState(null);
  const { user } = useContext(AuthContext);
    useEffect(() => {
      if (user) {
        axios
          .get(`https://library-kjji.onrender.com/api/lib/user/${user}`)
          .then((res) => {
            setuserData(res.data.user);
          })
          .catch((e) => {
            console.error(e); 
          });
      }
    }, [user]);
    useEffect(() => {
      if (user) {
        axios
          .get(`https://library-kjji.onrender.com/api/lib/user/zahialga/${user}`)
          .then((res) => {
            setzahtoo(res.data.count);
          })
          .catch((e) => {
            console.error(e); 
          });
      }
    }, [user]);
    useEffect(() => {
      if (user) {
        axios
          .get(`https://library-kjji.onrender.com/api/lib/user/zeel/${user}`)
          .then((res) => {
            setZeeltoo(res.data.count);
          })
          .catch((e) => {
            console.error(e); 
          });
      }
    }, [user]);
  return(
    <div>
      <motion.div className="min-h-full w-full border-t-2 border-gray-300  md:w-full sm:w-full bg-white items-center sm:gap-30 md:gap-35 lg:gap- gap-3 text-gray-900 p-1 flex justify-end">
        <nav>
              <div className="max-w-6xl gap-4 mx-auto flex justify-between items-center transition-all duration-100">
                <div className="flex gap-2 sm:gap-8 md:gap-15 lg:gap-25 text-sm sm:text-xl">
                <NavLink to='/userZahialga' className="text-gray-900  hover:text-blue-300 rounded-2xl pl-1 pr-1  transition-all duration-100"
                >Захиалсан ном<Badge badgeContent={zahtoo} color="primary" className="h-2 sm:h-fit">
              <MailIcon color="action" />
        </Badge></NavLink>
                  <NavLink to='/userZeel' className="text-gray-900 hover:text-blue-300  rounded-2xl pl-1 pr-1  transition-all duration-100">
                  Авсан ном<Badge badgeContent={zeeltoo} color="primary" className="h-2 sm:h-fit">
      <MailIcon color="action" />
    </Badge></NavLink>
                </div>
              </div>
            </nav>
    <div
        className="flex items-center space-x-4 px-3 py-1 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition"
      >
        <img
          src="https://api.dicebear.com/6.x/big-ears-neutral/svg?seed=Erdene"
          alt="Profile"
          className="w-12 h-8 rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{userData.Lname}</span>
          <span className="text-sm text-gray-500">{userData.oyutniCode}</span>
        </div>
      </div>
      </motion.div>
      <motion.div
        initial={{opacity: 0.4, x:-30}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.6}}
        className='grid grid-cols-1 sm:justify-center gap-3 md:grid-cols-2 sm:mt-10 md:mt-20 justify-center'>
          <div className='flex flex-col justify-center items-center'>
          <span className='sm:text-2xl lg:w-160 sm:font-extrabold flex flex-col md:justify-center items-center font-mono w-120 '><b className=' text-xl sm:text-3xl lg:text-6xl text-center'>'Мэдээлэл зүйн тэнхимийн'</b> <span className='text-md lg:text-4xl text-center w-fit'>номын санд тавтай морилно уу.</span></span>
          <NavLink to='/' className='mt-4 bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 text-lg rounded-xl font-semibold transition' onClick={() => navigate('/')}>Эхлэх</NavLink>
          </div>
       <motion.div 
       whileHover={{scale: 1.01}}
       className=" shadow-2xl w-70 sm:block sm:w-130 ml-15 md:w-70 lg:w-120 rounded-2xl bg-center">
         <img src={ConImage} alt='My img'  className='rounded-2xl  flex items-center h-70 sm:h-85 lg:h-90 lg:w-120 sm:w-130 md:w-70'/>
       </motion.div>
       </motion.div>
      </div>
  )
};
export default getUserInfo;
