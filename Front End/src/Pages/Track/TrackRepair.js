// Neha Dadarwala - neha.dadarwala@dal.ca
// Vrutika Kakadiya - vrutika.kakadiya@dal.ca

import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../Components/CustomButton';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RepairList = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://sparkle-api.onrender.com/repair/list',
            headers: {}
        };
        axios.request(config)
            .then((response) => {
                const data = response.data.list;
                const formattedData = data.map((item) => {
                    return {
                        _id: item._id,
                        name: item.name,
                        phone: item.phone,
                        status: item.status,
                        cost: item.cost,
                        bag: item.bag
                    };
                });
                setLoading(false);
                setRows(formattedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const navigate = useNavigate();

    const onModify = (row) => {
        const state = {
            _id: row._id,
            bag: row.bag
        };
        navigate('/modifyRepair', { state});

    };
    const handleGetRowId = (e) => {
        return e._id
    }
    
    const columns = [
        {
            field: '_id',
            headerName: 'Invoice ID',
            width: '150',
            headerAlign: "left",
        },
        {
            field: 'phone',
            headerName: 'Phone Number',
            width: '190',
            headerAlign: "left",
        },
        {
            field: 'bag',
            headerName: 'Bag number',
            type: 'number',
            width: '150',
            align: 'left',
            headerAlign: "left",
        },
        {
            field: 'name',
            headerName: 'Customer Name',
            width: '190',
            headerAlign: "left",
        },
        {
            field: 'cost',
            headerName: 'Amount',
            width: '150',
            headerAlign: "left",
        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'string',
            width: '150',
            align: 'left',
            headerAlign: "left",
        },
        {
            field: 'actions', headerName: 'Actions', width: 150, align: 'center', headerAlign: "center", renderCell: (params) => {
                return (
                    <CustomButton label="Modify" type="submit" onclickFunction={() => onModify(params.row)}></CustomButton>
                );
            }
        },
    ];

    return (


        <div style={{ height: 400, width: '80%', margin: 'auto', marginTop: '3%' }}>
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

export default RepairList