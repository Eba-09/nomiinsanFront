import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
const Zeel = () => {
  const [rows, setRows] = useState([]);
  const {sanch} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [count, setcount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (sanch) {
      axios
        .get(`https://library-kjji.onrender.com/api/lib/zeel`)
        .then((res) => {
          setcount(res.data.count)
          const zahialguud = res.data.data.map((zeel, index) => ({
            id: zeel._id,
            userName: zeel.userCode.Lname,
            name: zeel.nomCode.name,
            hel: zeel.nomCode.hel,
            rating: `${zeel.nomCode.rating} / 5`,
            tuluw: zeel.hugatsaaHetreh ? 'Хэтэрсэн' : 'Хэтрээгүй',
            ugsun: zeel.ugsun ? 'Өгсөн' : 'Өгөөгүй',
            sanchName: zeel.sanchCode.sanchLN,
            nomawsanDate: new Date(zeel.nomawsanDate).toLocaleDateString(),
            butsaahDate: new Date(zeel.butsaahDate).toLocaleDateString(),
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
  const handleEditClick = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleSave = () => {
    axios
      .put(`https://library-kjji.onrender.com/api/lib/zeel/${selectedId}`, {ugsun : status })
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
    { field: 'hel', headerName: 'Хэл', width: 95 },
    { field: 'rating', headerName: 'Үнэлгээ', width:70 },
    { field: 'sanchName', headerName: 'Номын санч', width: 120 },
    { field: 'nomawsanDate',headerName:'Ном авсан өдөр', width: 140 },
    { field: 'butsaahDate', headerName: 'Ном буцаах өдөр', width: 140 },
    { field: 'tuluw', headerName: 'Хугацаа', width: 120 },
    { field: 'ugsun', headerName: 'Өгсөн эсэх', width: 120 },
    {
      field: 'edit',
      headerName: 'Өгсөн төлөв засах',
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
  ];
  return (
    <div style={{ height: 590, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        sortingOrder={['desc', 'asc']}
        initialState={{
          sorting: {
            sortModel: [{ field: 'nomawsanDate', sort: 'desc' }],
          },
        }}
      />
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
              <option value="true">Өгсөн</option>
              <option value="false">Өгөөгүй</option>
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
    </div>
  );
};
export default Zeel;
