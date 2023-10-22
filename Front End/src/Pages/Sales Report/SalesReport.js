// Neha Dadarwala - neha.dadarwala@dal.ca

import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { Button } from '@material-ui/core';

const SalesReport = () => {

    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [sDate, setSDate] = useState(null);
    const [eDate, setEDate] = useState(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://sparkle-api.onrender.com/sales/getOrders',
            headers: {}
        };
        axios.request(config)
            .then((response) => {
                const data = response.data.order;
                const formattedData = data.map((item) => {
                    return {
                        _id: item.orderId,
                        customerName: item.customerName,
                        orderDate: item.orderDate,
                        totalPrice: item.totalPrice,
                    };
                });
                setLoading(false);
                setRows(formattedData);
                setFilteredRows(formattedData);
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
            field: '_id',
            headerName: 'Invoice ID',
            width: '200',
            headerAlign: "left",
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            width: '220',
            headerAlign: "left",
        },
        {
            field: 'orderDate',
            headerName: 'Order Date',
            width: '220',
            headerAlign: "left",
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: '200',
            headerAlign: "left",
        },
    ];

    const getReport = async (event) => {
        event.preventDefault();

        if(sDate !== null && eDate !== null){
            const dateStart = new Date(`${sDate}T00:00:00`);
            const dateEnd = new Date(`${eDate}T00:00:00`);    
            setFilteredRows(
                rows.filter(row => {
                    const orderDate = new Date(row.orderDate);
                    return orderDate >= dateStart && orderDate <= dateEnd
                })
            )    
        }else if(sDate !== null){
            const dateStart = new Date(`${sDate}T00:00:00`);
            setFilteredRows(
                rows.filter(row => {
                    const orderDate = new Date(row.orderDate);
                    return orderDate >= dateStart
                })
            )    
        }else if(eDate !== null){
            const dateEnd = new Date(`${eDate}T00:00:00`);
            setFilteredRows(
                rows.filter(row => {
                    const orderDate = new Date(row.orderDate);
                    return orderDate <= dateEnd
                })
            )    
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={getReport} style={{ margin: 'auto', marginTop: '3%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField type='date'
                        name="startDate"
                        label=" Start Date"
                        value={sDate}
                        onChange={(e) => setSDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField type='date'
                        name="endDate"
                        style={{ marginLeft: '4%' }}
                        label=" End Date"
                        value={eDate}
                        onChange={(e) => setEDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button style={{
                        marginLeft: "7%", backgroundColor: '#444454',
                        color: '#bab79d', borderColor: '#b28faa', height: 50, width: 150,
                        borderRadius: 7
                    }} variant="contained" type="submit">
                        Fetch Data
                    </Button>
                </form>
            </div>
            <div style={{ height: 400, width: '60%', margin: 'auto', marginTop: '3%' }}>
                <DataGrid
                    GridLinesVisibility="None"
                    rows={filteredRows}
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

        </div>
    )
}

export default SalesReport