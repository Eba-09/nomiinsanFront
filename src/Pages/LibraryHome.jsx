import { motion } from 'framer-motion';
import '../App.css';
import React, { useState, useEffect } from 'react';
import BookSlider from '../Components/BookSlider';
import axios from 'axios';

function LibraryHome() {
  const [categoryBooks, setCategoryBooks] = useState({});
  const [categoryIds, setCategoryIds] = useState({});
  const [catid, setcatid] = useState('');
  useEffect(() => {
    axios
      .get('https://library-kjji.onrender.com/api/lib/category/book/67f131d44f4702327dac47e8')
      .then((res) => {
        const books = res.data.data;
        const grouped = books.reduce((acc, book) => {
          const catName = book.category?.name || 'Unknown';
          const catId = book.category?._id;

          if (!acc[catName]) {
            acc[catName] = [];
          }
          acc[catName].push(book);
          setCategoryIds((prev) => ({ ...prev, [catName]: catId }));
          return acc;
        }, {});
        setCategoryBooks(grouped);
      })
      .catch((e) => {
        console.error("Категорийн мэдээлэл татагдсангүй: " + e);
      });
  }, []);
  return (
    <div className="min-h-full bg-gray-100 text-gray-900 px-6 py-4">
      <motion.main
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-4"
      >
        {Object.entries(categoryBooks).map(([categoryName, books], index) => (
          <motion.div
            key={index}
            className="bg-white p-2 mr-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            onMouseEnter={() => setcatid(categoryIds[categoryName])}
          >
            <BookSlider catid={catid} title={categoryName} books={books} />
          </motion.div>
        ))}
      </motion.main>
    </div>
  );
}
export default LibraryHome;
