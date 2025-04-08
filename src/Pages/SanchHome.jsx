import { useContext } from 'react'
import { AuthContext } from '../Components/AuthContext'
import React,{useState, useEffect} from "react"
import axios from 'axios';
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
const SanchHome = () => {
  const {sanch} = useContext(AuthContext);
  const [sanchData, setsanchData] = useState([]);
 useEffect(() => {
  if (sanch) {
    console.log(sanch)
    axios
      .get(`https://library-kjji.onrender.com/api/lib/nomsanch/${sanch}`)
      .then((res) => {
        setsanchData(res.data.data);
      })
      .catch((e) => {
        console.error(e); 
      });
  }
}, [sanch]);
useEffect(() => {
  if (sanch) {
    axios
      .get(`https://library-kjji.onrender.com/api/lib/sanch/zeel/${sanch}`)
      .then((res) => {
        setSanchZeel(res.data.count);
      })
      .catch((e) => {
        console.error(e); 
      });
  }
}, [sanch]);
return(
<div>
  <motion.div className="min-h-full w-full border-t-2 rounded-xl border-gray-300  md:w-full sm:w-full bg-white items-center sm:gap-30 md:gap-35 lg:gap-60 gap-3 text-gray-900 p-1 flex justify-end">
    <nav>
          <div className="max-w-6xl gap-4 mx-auto flex justify-between items-center transition-all duration-100">
            <div className="flex gap-2 sm:gap-8 md:gap-15 lg:gap-25 text-sm sm:text-xl">
            <NavLink to='/createBook' className="text-gray-900 rounded-2xl pl-1 pr-1  transition-all duration-100"
            >Ном үүсгэх</NavLink>
            <NavLink to='/zahialga' className="text-gray-900 rounded-2xl pl-1 pr-1  transition-all duration-100"
            >Захиалга</NavLink>
              <NavLink to='/zeel' className="text-gray-900 rounded-2xl pl-1 pr-1  transition-all duration-100">
              Гэрээр олгосон ном</NavLink>
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
      <span className="font-semibold text-center text-gray-800">{sanchData.sanchLN}</span>
      <span className="text-[13px] hidden md:block text-gray-500">{sanchData.sanchMail}</span>
    </div>
  </div>
  </motion.div>
  </div>
)
};
export default SanchHome;