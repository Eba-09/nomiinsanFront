import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout, sanchToken, sanchlogout} = useContext(AuthContext);
  const navigate = useNavigate();
 const handleLogout = () =>{
  localStorage.removeItem("token");
  localStorage.removeItem("sanchToken");
  logout();
  sanchlogout();
  navigate('/');
  }
  return (
    <nav>
      <div className="max-w-6xl mx-auto flex justify-between items-center transition-all duration-100">
        {/* Large screen navigation */}
        <div className="hidden md:flex gap-6">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-500 font-bold lg:border-b-1 rounded-2xl md:shadow-none  pl-1 pr-1  transition-all duration-100" : "hover:text-blue-500 text-gray-700 transition-all duration-100"}>Нүүр</NavLink>
          <NavLink to="/Book" className={({ isActive }) => isActive ? "text-blue-500 font-bold lg:border-b-1 md:shadow-none  rounded-2xl pl-1 pr-1  transition-all duration-100" : "hover:text-blue-500 text-gray-700 transition-all duration-100"}>Ном</NavLink>
          <NavLink to="/erdemShinj" className={({ isActive }) => isActive ? "text-blue-500 font-bold lg:border-b-1 md:shadow-none  rounded-2xl pl-1 pr-1  transition-all duration-100" : "hover:text-blue-500 text-gray-700 transition-all duration-100"}>Эрдэм шинжилгээ</NavLink>
          {sanchToken ? (
        <NavLink
        to="/sanchHome"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold md:lg:border-b-1 md:shadow-none rounded-2xl pl-1 pr-1  transition-all duration-100"
            : "hover:text-blue-500 text-gray-700 transition-all duration-100"
        }
      >
        Номын санч
      </NavLink>
      ) : null
      }
          {token || sanchToken ? (
        <button
          onClick={handleLogout}
          className="hover:text-blue-500 text-gray-700 transition-all duration-100"
        >
          Гарах
        </button>
      ) : (
        <NavLink
          to="/userLogin"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold md:lg:border-b-1 md:shadow-none rounded-2xl pl-1 pr-1  transition-all duration-100"
              : "hover:text-blue-500 text-gray-700 transition-all duration-100"
          }
        >
          Нэвтрэх
        </NavLink>
      )}
      
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden ml-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} />}
        </button>
      </div>
      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start gap-2 py-1 mt-2 rounded-lg">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-blue-500 font-bold transition-all duration-100" : "hover:text-blue-500"}>Нүүр</NavLink>
          <NavLink to="/Book" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-blue-500 font-bold transition-all duration-100" : "hover:text-blue-500"}>Ном</NavLink>
          <NavLink to="/erdemShinj" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-blue-500 font-bold transition-all duration-100" : "hover:text-blue-500"}>Эрдэм шинжилгээ</NavLink>
          <NavLink to="/sanchLogin" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-blue-500 font-bold transition-all duration-100" : "hover:text-blue-500"}>Дифлом</NavLink>
          {sanchToken ? (
        <NavLink
        to="/sanchHome"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold md:lg:border-b-1 md:shadow-none rounded-2xl pl-1 pr-1  transition-all duration-100"
            : "hover:text-blue-500 transition-all duration-100"
        }
      >
        Номын санч
      </NavLink>
      ) : null
      }
          {token || sanchToken ? (
        <button
          onClick={handleLogout}
          className="hover:text-blue-500 text-blue-500 transition-all duration-100"
        >
          Гарах
        </button>
      ) : (
        <NavLink
          to="/userLogin" onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold transition-all duration-100" : "hover:text-blue-500"
          }
        >
          Нэвтрэх
        </NavLink>
      )}
      
        </div>
      )}
    </nav>
  );
};

export default Navbar;
