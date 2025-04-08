import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../AuthContext';

const Zahialga = () => {
  const [rows, setRows] = useState([]);
  const { sanch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('');
  const [nomCode, setNomCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [isZeelModalOpen, setIsZeelModalOpen] = useState(false);
  const [butsaahDate, setButsaahDate] = useState('');
  const [sanchCode, setSanchCode]= useState('');
  const [zeelSelectId, setZeelSelectId] = useState('');
  const [bookCount, setBookCount] = useState(0);
   const [bookzeels, setBookZeels] = useState(0);
   const today = new Date();
const minDate = today.toISOString().split('T')[0];
const maxDays = bookCount > 5 ? 14 : 7;
const maxDateObj = new Date();
maxDateObj.setDate(today.getDate() + maxDays);
const maxDate = maxDateObj.toISOString().split('T')[0];
  useEffect(() => {
    if (sanch) {
      axios
        .get(`https://library-kjji.onrender.com/api/lib/zahialga`)
        .then((res) => {
          const zahialguud = res.data.data.map((zahialga, index) => ({
            id: zahialga._id,
            userName: zahialga.userCode.Lname,
            userId: zahialga.userCode._id,
            nomId: zahialga.nomCode._id,
            name: zahialga.nomCode.name,
            hel: zahialga.nomCode.hel,
            too: zahialga.nomCode.too - bookzeels,
            rating: `${zahialga.nomCode.rating} / 10`,
            tuluw: zahialga.tuluw ? 'Баталгаажсан' : 'Хүлээгдэж байна',
            zahialgaDate: new Date(zahialga.zahialgaDate).toLocaleDateString(),
          }));
          setRows(zahialguud);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
  }, [sanch]);
  useEffect(()=>{
    if(zeelSelectId){
      axios
          .get(`https://library-kjji.onrender.com/api/lib/book/zeel/${zeelSelectId}`)
          .then((res)=>{
            setBookZeels(res.data.count);
          })
          .catch((e)=>{
            console.log(e);
          })
    }
  },[zeelSelectId])
useEffect(() => {
  axios.get(`https://library-kjji.onrender.com/api/lib/book/${nomCode}`)
    .then((res) => {
      setBookCount(res.data.data.too);
    })
    .catch((err) => console.error("Номын тоо авахад алдаа гарлаа:", err));
}, [nomCode]);

  // Modal-ийг нээх
  const handleEditClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const handleZeelClick = (id,userid,nomid) => {
    setZeelSelectId(id);
    setUserCode(userid);
    setNomCode(nomid);
    setSanchCode(sanch);
    setIsZeelModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Төлөв сонгох функц
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const closeZeelModal = () => {
    setIsZeelModalOpen(false);
  };
  
  const handleZeelSave = () => {
    if (!butsaahDate) {
      alert("Буцаах өдрөө сонгоно уу.");
      return;
    }
    const selectedDate = new Date(butsaahDate);
    const maxAllowedDate = new Date();
    maxAllowedDate.setDate(today.getDate() + maxDays);
  
    if (selectedDate > maxAllowedDate) {
      alert(`Та дээд талдаа ${maxDays} хоногийн дотор буцаах өдөр сонгох ёстой.`);
      return;
    }
    const payload = {
      nomCode,
      userCode,
      sanchCode,
      butsaahDate,
    };
  
    axios
      .post(`https://library-kjji.onrender.com/api/lib/zeel`, payload)
      .then(() => {
        alert('Амжилттай зээл үүслээ.');
        setIsZeelModalOpen(false);
      })
      .catch((err) => {
        console.error('Алдаа гарлаа:', err);
      });
  };  
  const handleSave = () => {
    axios
      .put(`https://library-kjji.onrender.com/api/lib/zahialga/${selectedId}`, {tuluw : status })
      .then(() => {
        setIsModalOpen(false);
        alert('Захиалгын төлөв амжилттай өөрчлөгдлөө');
      })
      .catch((error) => {
        console.error('Алдаа гарлаа:', error);
      });
  };
  const columns = [
    { field: 'userName', headerName: 'Хэрэглэгч', width: 120 },
    { field: 'name', headerName: 'Номын нэр', width: 200 },
    { field: 'hel', headerName: 'Хэл', width: 120 },
    { field: 'rating', headerName: 'Үнэлгээ', width: 120 },
    { field: 'zahialgaDate', headerName: 'Захиалсан огноо', width: 180 },
    { field: 'too', headerName: 'Номын үлдэгдэл', width: 120 },
    { field: 'tuluw', headerName: 'Төлөв', width: 180 },
    {
      field: 'edit',
      headerName: 'Төлөв засах',
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <button
          className="bg-blue-400 text-white px-2 py-0 rounded-md"
          onClick={() => handleEditClick(params.row.id)}
        >
          Edit
        </button>
      ),
    },
    {
      field: 'zeeleh',
      headerName: 'Гэрээр олгох',
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <button
          className="bg-blue-400 text-white px-2 py-0 rounded-md"
          onClick={() => handleZeelClick(params.row.id, params.row.userId, params.row.nomId)}
        >
          Олгох
        </button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ height: 590, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          sortingOrder={['desc', 'asc']}
          initialState={{
            sorting: {
              sortModel: [{ field: 'zahialgaDate', sort: 'desc' }],
            },
          }}
        />
      </div>
      {/* zahialga batalgaajulah model */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent  bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">Захиалгын төлөв</h2>
            <select
              className="w-full p-2 mb-4 border rounded-md"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">Сонгоно уу</option>
              <option value="true">Баталгаажсан</option>
              <option value="false">Хүлээгдэж байна</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleSave}
              >
                Засах
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
      {/*zeel uusgeh Model */}
      {isZeelModalOpen && (
  <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      <h2 className="text-lg font-semibold mb-4">Буцаах өдөр оруулах</h2>
      <label className="block mb-2 text-sm">Буцаах өдөр:</label>
      <input
        type="date"
        className="w-full border border-gray-300 p-2 rounded mb-4"
        value={butsaahDate}
        min={minDate}
        max={maxDate}
        onChange={(e) => setButsaahDate(e.target.value)}
      />
      <div className="flex justify-end gap-3">
        <button
          onClick={handleZeelSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Хадгалах
        </button>
        <button
          onClick={closeZeelModal}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Хаах
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Zahialga;
