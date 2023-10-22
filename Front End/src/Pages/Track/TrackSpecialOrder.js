// Neha Dadarwala - neha.dadarwala@dal.ca

import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SpecialOrderList = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://sparkle-api.onrender.com/sorder/list',
            headers: {}
        };
        axios.request(config)
            .then((response) => {
                const data = response.data;
                const formattedData = data.map((item) => {
                    return {
                        _id: item._id,
                        name: item.name,
                        phone: item.phone,
                        address: item.address,
                        estimatedCost: item.estimatedCost,
                    };
                });
                setLoading(false);
                setRows(formattedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleGetRowId = (e) => {
        return e._id
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: '250',
            headerAlign: "left",
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            width: '250',
            headerAlign: "left",
        },
        {
            field: 'address',
            headerName: 'Address',
            width: '250',
            headerAlign: "left",
        },
        {
            field: 'estimatedCost',
            headerName: 'Estimated Cost',
            width: '150',
            headerAlign: "left",
        }
    ];

    return (
        <div style={{ height: 400, width: '60%', margin: 'auto', marginTop: '3%' }}>
            <DataGrid
                GridLinesVisibility="None"
                rows={rows}
                columns={columns}
                getRowId={handleGetRowId}
                pageSize={5}
                rowsPerPageOptions={[5]}
                loading={loading}
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        borderRadius: '20px 20px 0px 0px',

                        backgroundColor: '#bab79d',
                        color: '#444454',
                        fontSize: 17,
                        fontWeight: 'bold',
                    },
                    borderRadius: '20px',
                }}
            />
        </div>
    )
}

export default SpecialOrderList;