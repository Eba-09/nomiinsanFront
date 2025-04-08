import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faAddressBook,faPhone, faStar, faCalendarDays,faSackDollar,faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
const BookCreate = () => {
    const {sanch } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [authorId, setAuthorId] = useState('');
    const [isbn, setIsbn] = useState('');
    const [rating, setRating] = useState('');
    const [price, setPrice] = useState('');
    const [hel, setHel] = useState('');
    const [hewlesenOgnoo, setHewOgnoo] = useState('');
    const [too, setToo] = useState('');
    const [huudas, setHuudas] = useState('');
    const [available, setAvailable] = useState('');
    const [category, setCategory] = useState('');
    const [bairshil, setBairshil] = useState('');
    const [createUser, setCreateUser] = useState('');
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [AuthorFname,setAuthorFname ] = useState('');
    const [AuthorLname,setAuthorLname ] = useState('');
    const [AuthorPhone,setAuthorPhone ] = useState('');
    useEffect(() => {
        axios.get('https://library-kjji.onrender.com/api/lib/author')
            .then(response => setAuthors(response.data.data))
            .catch(error => console.log(error));
    }, []);
    useEffect(() => {
        axios.get('https://library-kjji.onrender.com/api/lib/category')
            .then(response => setCategories(response.data.data))
            .catch(error => console.log(error));
    }, []);
    const handleFileChange = (e) => {
      const file = e.target.files[0]; // Эхний файлыг авна
      if (file) {
          setPhoto(file); // Фото-г хадгална
      }
  };
  const authorCreate = (e) => {
    e.preventDefault();

    if (AuthorFname.trim() && AuthorLname.trim()) {
        axios.post('https://library-kjji.onrender.com/api/lib/author', {
            AuthorFname,
            AuthorLname,
            AuthorPhone,
        })
            .then((res) => {
                alert("Амжилттай зохиолч нэмлээ.");
                setAuthorFname('');
                setAuthorLname('');
                setAuthorPhone('');
            })
            .catch((e) => {
                alert("Амжилтгүй боллоо дахин оролдоно уу.");
                console.log(e.response?.data?.message || e.message);
            });
    } else {
        alert("Зохиолчийн овог, нэрийг оруулна уу.");
    }
};
const handleSubmit = (e) => {
  e.preventDefault();

  if (!sanch) {
      alert("Нэвтэрсэн хэрэглэгчийн мэдээлэл байхгүй байна!");
      return;
  }

  setCreateUser(sanch); // createUser-д хэрэглэгч онооно

  const formData = new FormData();
  formData.append("name", name);
  formData.append("photo", photo); // File input-с ирсэн зураг
  formData.append("authorId", authorId);
  formData.append("isbn", isbn);
  formData.append("rating", rating);
  formData.append("price", price);
  formData.append("hel", hel);
  formData.append("hewlesenOgnoo", hewlesenOgnoo);
  formData.append("too", too);
  formData.append("huudas", huudas);
  formData.append("available", available);
  formData.append("bairshil", bairshil);
  formData.append("category", category);
  formData.append("createUser", sanch); // шууд хэрэглэгч

  axios.post('https://library-kjji.onrender.com/api/lib/book', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  })
  .then((response) => {
      console.log("Success:", response.data);
      alert("Ном амжилттай үүслээ!");
      // Form reset
      setName('');
      setPhoto(null); // file input
      setAuthorId('');
      setIsbn('');
      setRating('');
      setPrice('');
      setHel('');
      setHewOgnoo('');
      setToo('');
      setHuudas('');
      setAvailable('');
      setCategory('');
      setBairshil('');
  })
  .catch((error) => {
      console.error("Error:", error);
      alert("Ном үүсгэх үед алдаа гарлаа");
  });
};

     
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
                  <NavLink to='/createBook' className="text-blue-500 rounded-2xl pl-1 pr-1  transition-all duration-100"
                  >Ном үүсгэх</NavLink>
                <NavLink to='/zahialga' className=" text-gray-900 rounded-2xl pl-1 pr-1  transition-all duration-100"
                >Захиалга</NavLink>
                  <NavLink to='/zeel' className="text-gray-900   rounded-2xl pl-1 pr-1  transition-all duration-100">
                  Гэрээр олгосон ном</NavLink>
                </div>
              </div>
            </nav>
            </motion.div>
            <motion.div 
              initial={{opacity: 0, x:-30}}
              animate={{opacity: 1, x:0}}
              transition={{duration: 0.6}}
            className='grid grid-cols-1 sm:pl-40 md:pl-5 md:gap-3 md:grid-cols-2'>
            <div className="bg-white w-90 ml-2 mt-3 sm:ml-5 sm:mt-6 text-sm md:text-[15px] rounded-xl  shadow-md hover:shadow-lg transition-all duration-300">
                <h6 className='text-center font-extrabold p-2 text-l font-sans'>Шинээр ном үүсгэх</h6>
                <form className='flex flex-col gap-1.5'>
                    <div className="flex items-center gap-5 pl-15 ">
                        <FontAwesomeIcon icon={faBook} />
                        <input className='outline-none' placeholder="Номын нэр" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
          <div className="flex items-center gap-5 pl-15 ">
            <FontAwesomeIcon icon={faBook} />
            <input className='outline-none' type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
          </div>
                    <div className="flex items-center gap-5 pl-15 ">
                        <FontAwesomeIcon icon={faBook} />
                        <input className='outline-none' placeholder="ISBN код" type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                    <FontAwesomeIcon icon={faStar} />
                        <input className='outline-none' placeholder="Үнэлгээ" type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                    <FontAwesomeIcon icon={faSackDollar} />
                        <input className='outline-none' placeholder="Үнэ" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                        <FontAwesomeIcon icon={faBook} />
                        <input className='outline-none' placeholder="Хэл" type="text" value={hel} onChange={(e) => setHel(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                    <FontAwesomeIcon icon={faCalendarDays} />
                        <input className='outline-none' placeholder="Хэвлэгдсэн огноо" type="date" value={hewlesenOgnoo} onChange={(e) => setHewOgnoo(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                        <FontAwesomeIcon icon={faBook} />
                        <input className='outline-none' placeholder="Хуудасны тоо" type="number" value={huudas} onChange={(e) => setHuudas(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                        <FontAwesomeIcon icon={faBook} />
                        <input className='outline-none' placeholder="Номын тоо" type="number" value={too} onChange={(e) => setToo(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                    <FontAwesomeIcon icon={faHouse} />
                        <input className='outline-none' placeholder="Байршил" type="text" value={bairshil} onChange={(e) => setBairshil(e.target.value)} />
                    </div>
                    <div className="flex pl-15 flex-col">
                        <p><FontAwesomeIcon icon={faAddressBook} /> Зохиолчид:</p>
                        <select
                    id="authorSelect"
                     className="w-50 p-2 rounded"
                     onChange={(e) => {
                       setAuthorId(e.target.value);
                     }}>
                     <option value="">-- Сонгох --</option>
                     {authors.map((author) => (
                       <option key={author._id} value={author._id}>
                         {author.AuthorLname}
                       </option>
                     ))}
            </select>
                    </div>
                    <div className="flex pl-15 flex-col">
                        <p>Категориуд:</p>
        <select
                    id="categorySelect"
                     className="w-50 p-2 rounded"
                     onChange={(e) => {
                       setCategory(e.target.value);
                     }}>
                     <option value="">-- Сонгох --</option>
                     {categories.map((category) => (
                       <option key={category._id} value={category._id}>
                         {category.name}
                       </option>
                     ))}
            </select>
                    </div>
                    <div className="flex pl-15 flex-col">
              <p>Төрөл:</p>
              <select
                id="typeSelect"
                className="w-50 p-2 rounded"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              >
                <option value="">-- Сонгох --</option>
                <option value="new">new</option>
                <option value="old">old</option>
                <option value="ашиглахгүй">ашиглахгүй</option>
              </select>
            </div>              
            <div className="button flex justify-center p-1.5">
                    <button type='submit' onClick={handleSubmit} className='bg-green-400 hover:bg-green-500 rounded-2xl text-center pl-1.5 pr-1.5 max-w-32 w-full'>Үүсгэх</button>
                    </div>
                </form>
            </div>
            <div className='bg-white h-fit p-2 w-70 ml-2 mt-3 sm:ml-5 sm:mt-6 text-sm md:text-[14px] rounded-xl  shadow-md hover:shadow-lg transition-all duration-300'>
            <h6 className='text-center font-extrabold p-2 text-l font-sans'>Шинээр зохиолч үүсгэх</h6>
                <form className='flex p-2 flex-col gap-1.5' >
                <div className="flex items-center gap-5 pl-15 ">
                <FontAwesomeIcon icon={faAddressBook} />
                        <input className='outline-none' placeholder="Зохиолчийн овог" type="text" value={AuthorFname} onChange={(e) => setAuthorFname(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                    <FontAwesomeIcon icon={faAddressBook} />
                        <input className='outline-none' placeholder="Зохиолчийн Нэр" type="text" value={AuthorLname} onChange={(e) => setAuthorLname(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-5 pl-15 ">
                    <FontAwesomeIcon icon={faPhone} />
                        <input className='outline-none' placeholder="Утасны дугаар" type="text" value={AuthorPhone} onChange={(e) => setAuthorPhone(e.target.value)} />
                    </div>
                    <div className="button flex justify-center p-1.5">
                    <button onClick={ authorCreate} className='bg-green-400 hover:bg-green-500 rounded-2xl text-center pl-1.5 pr-1.5 max-w-32 w-full'>Үүсгэх</button>
                    </div>
                </form>
            </div>
            </motion.div>
        </div>
    );
};

export default BookCreate;