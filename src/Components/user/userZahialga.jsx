import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const UserZahialga = ({ user }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      axios
        .get(`https://library-kjji.onrender.com/api/lib/user/zahialga/${user}`)
        .then((res) => {
          const zahialguud = res.data.data.map((zahialga, index) => ({
            id: zahialga._id,
            name: zahialga.nomCode.name,
            hel: zahialga.nomCode.hel,
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
  }, [user]);
  const columns = [
    { field: 'name', headerName: 'Номын нэр', width: 200 },
    { field: 'hel', headerName: 'Хэл', width: 120 },
    { field: 'rating', headerName: 'Үнэлгээ', width: 120 },
    { field: 'tuluw', headerName: 'Төлөв', width: 180 },
    { field: 'zahialgaDate', headerName: 'Захиалсан огноо', width: 180 },
  ];

  return (
    <div style={{ height: 265, width: '100%' }}>
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
  );
};

export default UserZahialga;
