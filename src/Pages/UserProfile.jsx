import React,{useState, useEffect} from "react"
import { CircleUser } from 'lucide-react';
import { useContext } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { AuthContext } from '../Components/AuthContext';
import { NavLink } from "react-router-dom";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import UserZahialga from "../Components/user/userZahialga";
import UserZeel from "../Components/user/userZeel";
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
      <motion.div className="min-h-full w-full border-t-2 rounded-xl border-gray-300  md:w-full sm:w-full bg-white items-center sm:gap-30 md:gap-35 lg:gap- gap-3 text-gray-900 p-1 flex justify-end">
        <nav>
              <div className="max-w-6xl gap-4 mx-auto flex justify-between items-center transition-all duration-100">
                <div className="flex gap-2 sm:gap-8 md:gap-15 lg:gap-25 text-sm sm:text-xl">
                <NavLink className="text-gray-900   rounded-2xl pl-1 pr-1  transition-all duration-100"
                >Захиалсан ном<Badge badgeContent={zahtoo} color="primary" className="h-2 sm:h-fit">
              <MailIcon color="action" />
        </Badge></NavLink>
                  <NavLink className="text-gray-900   rounded-2xl pl-1 pr-1  transition-all duration-100">
                  Авсан <Badge badgeContent={zeeltoo} color="primary" className="h-2 sm:h-fit">
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
      <motion.div className="bg-white mt-2 text-center font-bold">
        <p>Захиалсан ном:</p>
      <UserZahialga user={user} />
      </motion.div>
      <motion.div className="bg-white mt-2 text-center font-bold">
        <p>Авсан ном:</p>
      <UserZeel user={user} />
      </motion.div>
      </div>
  )
};
export default getUserInfo;
