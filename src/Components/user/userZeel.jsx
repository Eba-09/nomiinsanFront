import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
const UserZeel = ({ user }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      axios
        .get(`https://library-kjji.onrender.com/api/lib/user/zeel/${user}`)
        .then((res) => {
          const zahialguud = res.data.data.map((zeel, index) => ({
            id: zeel._id,
            name: zeel.nomCode.name,
            hel: zeel.nomCode.hel,
            rating: `${zeel.nomCode.rating} / 10`,
            tuluw: zeel.hugatsaaHetreh ? 'Хэтэрсэн' : 'Хэтрээгүй',
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
  }, [user]);

  const columns = [
    { field: 'name', headerName: 'Номын нэр', width: 200 },
    { field: 'hel', headerName: 'Хэл', width: 120 },
    { field: 'rating', headerName: 'Үнэлгээ', width: 120 },
    { field: 'tuluw', headerName: 'Хугацаа', width: 180 },
    { field: 'sanchName', headerName: 'Номын санч', width: 180 },
    { field: 'nomawsanDate', headerName: 'Ном авсан өдөр', width: 180 },
    { field: 'butsaahDate', headerName: 'Ном буцаах өдөр', width: 180 },
  ];

  return (
    <div style={{ height: 263, width: '100%' }}>
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
    </div>
  );
};

export default UserZeel;
