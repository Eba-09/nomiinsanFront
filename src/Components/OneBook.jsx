import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
function OneBook () {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookdata, setbookdata] = useState([]);
    const { bookid } = location.state || {};
    const {user, sanch} = useContext(AuthContext);
    const [bookzeels, setBookZeels] = useState(0);
    const [catid, setcatid ] = useState('');
    useEffect(()=>{
        if(bookid){
            axios
                .get(`https://library-kjji.onrender.com/api/lib/book/${bookid}`)
                .then((res)=>{
                    setbookdata(res.data.data)
                    
                })
                .catch((e)=>{
                    console.log(e);
                })
        }
    },[bookid]);
    useEffect(()=>{
      if(bookid){
        axios
            .get(`https://library-kjji.onrender.com/api/lib/book/zeel/${bookid}`)
            .then((res)=>{
              setBookZeels(res.data.count);
            })
            .catch((e)=>{
              console.log(e);
            })
      }
    },[bookid])
    const Zahialah = (nomCode) => {
        if(user){
          if(bookzeels < bookdata.too){
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
            alert("Уг номын үлдэгдэл дууссан байна.")
          }
        }
        else{
            navigate('/userLogin')
        }
      }
      const BookDelete = (book) =>{
          axios
              .delete(`https://library-kjji.onrender.com/api/lib/book/${book}`)
              .then((res)=>{
                alert("Амжилттай ном устлаа");
              })
              .catch((e)=>{
                console.log(e);
                alert("Ном устгах амжилтгүй боллоо")
              })
        }
    const renderBook = () => {
        if (!bookdata) return <p>Уншиж байна...</p>;
      
        return (
            <div className="w-full min-h-[calc(100vh-7vh)] bg-gradient-to-br from-green-50 to-white flex flex-col md:flex-row items-center justify-center px-6 py-10">
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <motion.img
  whileHover={{ scale: 1.02 }}
  src={
    bookdata.photo
      ? `${bookdata.photo}`
      : "/placeholder.jpg" // Зураг байхгүй үед харагдах default зураг
  }
  alt={bookdata.name}
  className="w-[300px] h-[420px] md:h-[500px] md:w-[330px] lg:w-[365px] bg-center object-center hover:shadow-2xl rounded-2xl shadow-lg"
/>
            </div>
            <div className="w-full md:w-1/2 max-w-2xl font-sans bg-white p-6 rounded-3xl shadow-xl flex flex-col gap-4">
              <h1 className="text-xl lg:text-3xl  font-extrabold text-center text-gray-800">{bookdata.name}</h1>
              <span>{bookdata.authorId?.AuthorFname + ' ' + bookdata.authorId?.AuthorLname}</span>
              {bookdata.category === "67f1298bec2de1c6e7523aac" ? (
                <a href='https://drive.google.com/drive/folders/111YtQfChFgkaYjDO-Sq26lbTjBzNlqEi?usp=sharing' className='no-underline'>PDF файлаар үзэх</a> 
                  ) : null}
              {bookdata._id === "67f4efc2e7f35922eaaa5593" ? (
                <a href='https://drive.google.com/file/d/1j8X6d6G8mhqtuGl1ATLHl-YsFzTKhlWW/view?usp=sharing' className='no-underline'>PDF файлаар үзэх</a> 
                  ) : null}
              <div className="grid grid-cols-2 place-content-center gap-4 text-gray-700 text-base">
                {sanch ? (<div><h6>Үнэ:</h6> <span className="text-red-500">{bookdata.price}₮</span></div>): null}
                <div><h6>Хэл:</h6> {bookdata.hel}</div>
                <div><h6>ISBN:</h6> {bookdata.isbn}</div>
                <div><h6>Хуудас:</h6> {bookdata.huudas}</div>
                <div><h6>Үлдэгдэл:</h6> {bookdata.too-bookzeels}ш</div>
                {sanch ? (<div><h6>Нийт тоо:</h6>{bookdata.too}ш</div>):null}
                <div><h6>Байршил:</h6> {bookdata.bairshil}</div>
              </div>
              <div className="flex items-center gap-2 text-yellow-500 text-lg">
                {"★".repeat(bookdata.rating)}{"☆".repeat(5 - bookdata.rating)}
                <span className="text-gray-600 text-center sm:text-2xl text-base">({bookdata.rating})</span>
              </div>
              { sanch ? (<button className="bmt-4 bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 text-lg rounded-xl font-semibold transition"
                  onClick={() => BookDelete(bookdata._id)}>Засварлах</button>)
                   : (<button
                    onClick={() => Zahialah(bookdata._id)}
                    className="mt-4 bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 text-lg rounded-xl font-semibold transition"
                  >
                    Захиалах
                  </button>)
                   }
              
            </div>
          </div>
        );
      };
      
  return (
    <motion.div
    initial={{opacity: 0, x: -60}}
    animate={{opacity: 1, x:0}}
    transition={{duration: 0.8}}
    >{renderBook()}</motion.div>
  )
}

export default OneBook