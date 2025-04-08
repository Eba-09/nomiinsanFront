import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import { motion } from 'framer-motion'
import { NavLink } from "react-router-dom";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios'
import Zahiaga from './Zahialga'
const SanchZahialga = () => {
    const { sanch } = useContext(AuthContext);
    const [zeeltoo, setZeeltoo] = useState(null);
     const [zahtoo, setzahtoo] = useState(null);
    useEffect(() => {
        if (sanch) {
          axios
            .get(`https://library-kjji.onrender.com/api/lib/zeel`)
            .then((res) => {
              setZeeltoo(res.data.count);
            })
            .catch((e) => {
              console.error(e); 
            });
        }
      }, [sanch]);
      useEffect(() => {
        if (sanch) {
          axios
            .get(`https://library-kjji.onrender.com/api/lib/zahialga`)
            .then((res) => {
              setzahtoo(res.data.count);
            })
            .catch((e) => {
              console.error(e); 
            });
        }
      }, [sanch]);
  return (
    <div>
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.6}}
        className='min-h-fit border-t-2 rounded-xl border-gray-300  md:w-full sm:w-full bg-white items-center sm:gap-30 md:gap-35 lg:gap-60 gap-3 text-gray-900 p-1 flex justify-center'
        >
        <nav>
              <div className="max-w-6xl gap-4 mx-auto flex justify-between items-center transition-all duration-100">
                <div className="flex gap-2 sm:gap-8 md:gap-15 lg:gap-25 p-2 text-sm sm:text-xl">
                  <NavLink to='/createBook' className="text-gray-900 rounded-2xl pl-1 pr-1  transition-all duration-100"
                  >Ном үүсгэх</NavLink>
                <NavLink to='/zahialga' className="text-blue-500   rounded-2xl pl-1 pr-1  transition-all duration-100"
                >Захиалга<Badge badgeContent={zahtoo} color="primary" className="h-2 sm:h-fit">
              <MailIcon color="action" />
        </Badge></NavLink>
                  <NavLink to='/zeel' className="text-gray-900   rounded-2xl pl-1 pr-1  transition-all duration-100">
                  Гэрээр олгосон ном</NavLink>
                </div>
              </div>
            </nav>
            </motion.div>
            <Zahiaga />
    </div>
  )
}
export default SanchZahialga