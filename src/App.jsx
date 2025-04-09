import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbars';
import CreateBook from './Components/sanch/BookCreate';
import SanchHome from './Pages/SanchHome';
import SanchLogin from './Components/sanch/SanchLogin';
import UserLogin  from './Components/user/UserLog';
import UserReg from './Components/user/UserReg';
import SanchReg from './Components/sanch/SanchReg';
import LibraryHome from './Pages/LibraryHome';
import UserProfile from './Pages/UserProfile';
import Logo from './images/logos.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { AuthContext } from './Components/AuthContext';
import {CircleUser } from 'lucide-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CatBooks from './Components/CatBooks';
import OneBook from './Components/OneBook';
import Books from './Components/Book';
import ErdemShinj from './Components/ErdemShinj';
import SanchZeel from './Components/sanch/SanchZeels';
import SanchZahialga from './Components/sanch/SanchZahialgas';
import UserZahial from './Components/user/UserZahial';
import UserZeels from './Components/user/UserZeels';
import PdfViewer from './Components/PdfViewer';
import Diplom from './Components/Diplom'
function App() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    if(selectedCategory){
      axios.get(`https://library-kjji.onrender.com/api/lib/category/book/${selectedCategory}`)
      .then((res) => {setBooks(res.data.data)
        console.log(res.data.data)
      })
      .catch((err) => console.error('Ном татахад алдаа:', err));
    }
  }, [selectedCategory]);
  useEffect(() => {
    if (search.trim() === '') {
      console.log(search);
      setFiltered([]);
    } else {
      const result = books.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(result);
    }
  }, [search, books]);
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-black font-bold">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };
  const handleFocus = async () => {
    try {
      const res = await axios.get('https://library-kjji.onrender.com/api/lib/category');
      setCategories(res.data.data);
      setShowCategory(true);
    } catch (err) {
      console.error("Категори татаж чадсангүй:", err);
    }
  };
  const handleCategoryChange = (categoryId) => {
    onCategorySelect(categoryId);
  };
  const onCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("Сонгосон категори:", categoryId);
  };
  const SelectBook = (bookid) => {
    if(bookid){
      navigate('/oneBook', {state: {bookid : bookid}})
    }
  }
  return (
      <div className="flex flex-col w-full min-h-screen  text-gray-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" text-blue-600 py-4 px-6 rounded-l bg-white  flex justify-between items-center gap-7 sm:p-1 sm:gap-2"
      >
        <div className='flex flex-row items-center gap-1 sm:gap-5'>
        <img src={Logo} width='40px' height="20px"/>
        <h1 className="lg:text-lg text-sm hidden sm:block md:text-md xl:text-xl 2xl:text-xl font-bold  sm:text-sm"> Мэдээлэл зүйн тэнхимийн номын сан</h1>
        </div>
        <Navbar />
        <div
        className='p-1 flex items-center justify-between rounded-md text-black bg-gray-300 transition-all duration-0.5 w-full xs:w-30 md:w-40 lg:w-50 '
        >
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setShowCategory(false), 200)}          
          placeholder="Ном хайх..."
          className=" outline-0 lg:focus:w-38 focus:w-25 focus:bg-gray-200 rounded-sm sm:focus:w-30 md:w-35 md:focus:40 w-full xs:w-20"
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className='w-8'/>
        </div>
        {token ? (
      <motion.div>
          <CircleUser className='w-6 sm:w-8 md:w-10 sm:h-6 md:h-8' onClick={() => navigate('userProfile')} />
        </motion.div>
        ) : null}
      </motion.header>
      <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: -30 }}
      transition={{ duration: 0.6 }}
      >
      </motion.div>
      {showCategory && (
        <div className="absolute top-11 left-0 w-full bg-white border shadow-md mt-1 rounded z-10 max-h-60 overflow-auto">
          {categories.map((cat) => (
            <label
              key={cat._id}
              className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(cat._id)}
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      )}
      <AnimatePresence>
        {filtered?.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 bg-white w-full sm:w-70 mt-12 md:w-80 right-0 border rounded-md shadow-md max-h-60 overflow-y-auto"
          >
            {filtered.map((book) => (
              <motion.li
                key={book._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => SelectBook(book._id)}
              >
                {highlightMatch(book.name, search)}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
        <div>
          <Routes>
            <Route path="/" element={<LibraryHome />}/>
            <Route path='/createBook' element={<CreateBook />} />
            <Route path='/sanchHome' element={<SanchHome />} />
            <Route path='/sanchLogin' element={<SanchLogin />} />
            <Route path='/userLogin' element={<UserLogin />} />
            <Route path='/userReg' element={<UserReg />} />
            <Route path='/sanchReg' element={<SanchReg />} />
            <Route path='/userProfile' element={<UserProfile />} />
            <Route path='/catBooks' element={<CatBooks />} />
            <Route path='/oneBook' element={<OneBook />} />
            <Route path='/Book' element={<Books />} />
            <Route path='/erdemShinj' element={<ErdemShinj />} />
            <Route path='/zeel' element={<SanchZeel />} />
            <Route path='/zahialga' element={<SanchZahialga />} />
            <Route path='/userZeel' element={<UserZeels />} />
            <Route path='/userZahialga' element={<UserZahial />} />
            <Route path='/pdf' element={<PdfViewer />} />
            <Route path='/diplom' element={<Diplom />} />
          </Routes>
        </div>
      </div>
    
  );
}

export default App;
