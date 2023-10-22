// Neha Dadarwala - neha.dadarwala@dal.ca

import { useNavigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from "react";
import CustomButton from '../../Components/CustomButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const columns = [
    {
        field: 'productName',
        headerName: 'Product',
        width: '570',
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 340,
        align: 'left',
        headerAlign: "left",
    },
];

function pad2(n) {
    return n < 10 ? '0' + n : n
}

const generateBillNumber = () => {
    var date = new Date();
    var billnumber = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds())
    return "R" + billnumber
}


const RefundBillDetails = () => {
    const location = useLocation();
    let selectedRows = []

    const Swal = require('sweetalert2')

    const [rows, setRows] = useState([]);
    const [paymentMode, setPaymentMode] = useState('Credit Card');

    const navigate = useNavigate();

    if (location.state) {
        selectedRows = location.state.selectedRows;
    }

    useEffect(() => {
        let role = localStorage.getItem('role')
        if (role !== 'admin' && role !== 'sales associate') {
            navigate('/Login')
        }
    });


    const insertRefundInvoice = async (data) => {
        // console.log("DATA 1:: ", data);
        let dbJson = JSON.parse(JSON.stringify(data));
        dbJson.products = selectedRows
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sparkle-api.onrender.com/refund/newRefund',
            // url: 'http://localhost:3000/refund/newRefund',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dbJson
        };
        try {
            var response = await axios(config);
            // console.log("DATA 2 :: ", data);
            console.log(JSON.stringify(response.data));
            navigate('/invoice', {
                replace: true,
                state: {
                    data: data
                }
            });
        } catch (error) {
            Swal.fire("Error Occurred");
        }
    }


    const calculateTotal = useCallback(async () => {
        let totalRefundAmount = 0;
        selectedRows.forEach((row) => {
            totalRefundAmount = totalRefundAmount + row.price;
        });
        let tax = totalRefundAmount * 0.05;
        totalRefundAmount = totalRefundAmount + tax;
        setRows([...selectedRows, { row_id: 10220, productName: 'GST (5%) ', price: tax }, { row_id: 10110, productName: 'Total', price: totalRefundAmount }]);
    }, [selectedRows]);

    useEffect(() => {
        setRows(selectedRows);
        calculateTotal();
    }, [calculateTotal, selectedRows]);

    const handleChange = (event) => {
        setPaymentMode(event.target.value);
    };

    const generateInvoice = async () => {
        if (paymentMode === 'Credit Card' || paymentMode === 'Debit Card') {
            const { value: formValues } = await Swal.fire({
                title: 'Enter Card Details',
                html:
                    '<input required id="swal-input1" placeholder="Card Holder Name" class="swal2-input">' +
                    '<input required type="number" id="swal-input2" placeholder="Card Number"class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                    if (document.getElementById('swal-input1').value !== '' || document.getElementById('swal-input1').value !== '') {
                        let cardNumber =document.getElementById('swal-input2').value;
                        cardNumber = cardNumber.replace(/\s+/g, '');
                        if(cardNumber.length == 12){
                            return [
                                document.getElementById('swal-input1').value,
                                document.getElementById('swal-input2').value
                            ]
                        }else{
                            Swal.showValidationMessage('Invalid Card number. Length is 12.')
                        }
                    } else {
                        Swal.showValidationMessage('Input Fields Missing')
                    }
                }
            })
            if (formValues) {
                let todaysDate = new Date()
                let data = JSON.parse(JSON.stringify({
                    "_id": generateBillNumber(),
                    "customerName": location.state.customerName,
                    "orderDate": todaysDate.toISOString().split('T')[0],
                    "products": rows,
                    "paymentDetails": {
                        "paymentMode": paymentMode,
                        "accountHolder": formValues[0],
                        "accountNumber": formValues[1]
                    }
                }))
                insertRefundInvoice(data)
            }
        } else {
            const { value: formValues } = await Swal.fire({
                title: 'Enter Customer Name',
                html:
                    '<input required id="swal-input1" placeholder="Customer Name" class="swal1-input">',
                preConfirm: () => {
                    if (document.getElementById('swal-input1').value !== '') {
                        return [
                            document.getElementById('swal-input1').value,
                            "XXX"
                        ]
                    } else {
                        Swal.showValidationMessage('Input Field Missing')
                    }
                }
            })
            if (formValues) {
                let todaysDate = new Date()
                let data = JSON.parse(JSON.stringify({
                    "_id": generateBillNumber(),
                    "customerName": location.state.customerName,
                    "orderDate": todaysDate.toISOString().split('T')[0],
                    "products": rows,
                    "paymentDetails": {
                        "paymentMode": paymentMode,
                        "accountHolder": formValues[0],
                        "accountNumber": formValues[1]
                    }
                }))
                insertRefundInvoice(data)
            }
        }
    }


    return (
        <div style={{ height: 400, width: '60%', margin: 'auto', marginTop: '5%' }}>
            <h1 style={{ textAlign: 'center' }}>Bill Summary</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                isRowHoverEnabled={true}
                hideFooterPagination
                getRowId={(row) => row.row_id}
                hideFooterSelectedRowCount
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        borderRadius: '20px 20px 0px 0px',

                        backgroundColor: '#bab79d',
                        color: '#444454',
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                    borderRadius: '20px',
                    "& .MuiDataGrid-row": {
                        "&:last-child": {
                            fontWeight: 'bold',
                            fontSize: 16,
                        }
                    },
                }}
            />
            <div>
                <FormControl variant="filled" style={{ width: '20%', marginTop: '3%' }}>
                    <InputLabel id="demo-simple-select-label"
                        style={{ color: '#bab79d', verticalAlign: 'middle', marginTop: 0 }}>Payment Mode</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={paymentMode}
                        label="Payment Mode"
                        disableUnderline
                        labelwidth={150}
                        onChange={handleChange}
                        style={{ backgroundColor: '#444454', borderRadius: 20, height: 50, width: 150 }}
                        required
                        inputProps={{
                            sx: {
                                color: '#bab79d',
                            },
                            MenuProps: {
                                MenuListProps: {
                                    sx: {
                                        backgroundColor: '#444454',
                                        color: '#bab79d',
                                        borderColor: '#b28faa',
                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem value='Credit Card'>Credit Card</MenuItem>
                        <MenuItem value='Debit Card'>Debit Card</MenuItem>
                        <MenuItem value='Cash'>Cash</MenuItem>
                    </Select>
                </FormControl>
                <CustomButton label="Proceed" onclickFunction={generateInvoice}></CustomButton>
            </div>

        </div>


    )
}

export default RefundBillDetails