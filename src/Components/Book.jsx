import { motion } from 'framer-motion';
import '../App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
  function Books() {
    const navigate = useNavigate();
  const [books, setbooks] = useState([]);
  const [catName, setCatname] = useState('');
  const { user } = useContext(AuthContext);
  useEffect(()=>{
      axios
          .get(`https://library-kjji.onrender.com/api/lib/category/67f1290aec2de1c6e7523aa9`)
          .then((res)=>{
            setCatname(res.data.data.name)
          })
          .catch((e)=>{
            console.log(e);
          })
  },[])
  useEffect(() => {
    if(catName){
    axios
        .get(`https://library-kjji.onrender.com/api/lib/category/book/67f1290aec2de1c6e7523aa9`)
        .then((res) =>{
            setbooks(res.data.data);
        })
        .catch((e) => {
            console.log(e)
        })
    }
  },[catName])
  const Zahialah = (nomCode) => {
    if(user){
        axios
             .post('https://library-kjji.onrender.com/api/lib/zahialga', {
                nomCode: nomCode,
                userCode: user
            })
            .then((res) => {
                if(res.data.success){
                    alert("amjilttai zahiallaa.")
                }
            })
            .catch((e) => {
                alert("zahialga amjiltgui bolloo")
            })
    }
    else{
        navigate('/userLogin')
    }
  }
  const OneBook = (bookid) =>{
    if(bookid){
      navigate('/oneBook', {state: {bookid : bookid}})
    }
  }
  const renderBooks = () => {
    return books.map((book) => (
      <div key={book._id} className="min-w-[140px] bg-white rounded-2xl flex flex-col items-center hover:shadow-lg transition duration-300 flex-shrink-0">
        <img onClick={() => OneBook(book._id)}
        src={`https://library-kjji.onrender.com${book.photo}`}
            alt={book.name}
            className="w-30 h-40 object-cover p-1 bg-cover rounded-t-2xl"
          />
          <div className="p-2">
            <h3 className="text-sm text-center font-semibold text-gray-800 line-clamp-1">
              {book.name}
            </h3>
            <p className="text-sm text-center text-gray-800 line-clamp-1">
                {book.authorId?.AuthorLname || "Unknown Author"}
            </p>
            <button className="bg-green-300 hover:bg-green-500 rounded-2xl text-sm text-center pl-1.5 pr-1.5 w-20 md:w-40 sm:w-25" onClick={() => Zahialah(book._id)}>Захиалах</button>
          </div>
      </div>
    ));
  };
  return (
    <div className="min-h-full bg-gray-100 font-sans text-gray-900 p-4">
      <p className='text-center font-bold text-gray-800 font-sans'>{catName}</p>
      <motion.main
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-2 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
       {renderBooks()}   
      </motion.main>
    </div>
  );
}
export default Books