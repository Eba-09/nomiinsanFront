import { motion } from 'framer-motion';
import '../App.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
  function CatBooks() {
    const location = useLocation();
    const navigate = useNavigate();
  const { catid } = location.state || {};
  const [books, setbooks] = useState([]);
  const [catName, setCatname] = useState('');
  const { user, sanch } = useContext(AuthContext);
    const [bookzeels, setBookZeels] = useState(Number);
    const [boid, setBoid ] = useState('');
  useEffect(()=>{
    if(catid){
      axios
          .get(`https://library-kjji.onrender.com/api/lib/category/${catid}`)
          .then((res)=>{
            
            setCatname(res.data.data.name)
          })
          .catch((e)=>{
            console.log(e);
          })
    }
  },[catid])
  useEffect(() => {
    if(catid){
    axios
        .get(`https://library-kjji.onrender.com/api/lib/category/book/${catid}`)
        .then((res) =>{
            setbooks(res.data.data);
        })
        .catch((e) => {
            console.log(e)
        })
    }
  },[catid])
  useEffect(()=>{
    if(boid){
      axios
          .get(`https://library-kjji.onrender.com/api/lib/book/zeel/${boid}`)
          .then((res)=>{
            setBookZeels(res.data.count);
          })
          .catch((e)=>{
            console.log(e);
          })
    }
  },[boid])
  const Zahialah = (nomCode,booktoo) => {
    if(user){
      if(bookzeels < booktoo){
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
        alert("Уг номын үлдэгдэл дууссан байна.");
      }
        
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
      <div key={book._id} className="w-45 bg-white rounded-2xl flex flex-col items-center justify-centers hover:shadow-lg transition duration-300 flex-shrink-0">
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
            { sanch ? null
                   : (<button className="bg-green-300 hover:bg-green-500 rounded-2xl text-sm
                     text-center pl-1.5 pr-1.5 w-40" onClick={() => Zahialah(book._id, book.too)}>Захиалах</button>)
                   }
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
        className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
       {renderBooks()}   
      </motion.main>
    </div>
  );
}
export default CatBooks