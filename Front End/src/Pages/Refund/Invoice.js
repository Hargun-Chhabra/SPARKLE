// Neha Dadarwala - neha.dadarwala@dal.ca

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './invoice.css';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomButton from '../../Components/CustomButton';
import { useEffect, useState } from "react";

const Invoice = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [rows, setRows] = useState([]);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [paymentDetails, setPaymentDetails] = useState('Credit Card');


    let id
    let customerName
    if(location.state){
        id = location.state.data._id ?? " "
        customerName = location.state.data.customerName ?? " "    
    }


    const logout = () => {
        console.log("logout clicked")
        navigate('/logout');
    };

    useEffect(() => {
        let role = localStorage.getItem('role')
        if (role !== 'admin' && role !== 'sales associate') {
            navigate('/Login')
        }
    }, [navigate]);


    useEffect(() => {
        if(location.state){
            if (location.state.data.products.length > 2) {
                setTax(Math.round(location.state.data.products.slice(-2)[0].price * 100) / 100)
                setTotal(Math.round(location.state.data.products.slice(-1)[0].price * 100) / 100)
            }
            setPaymentDetails(location.state.data.paymentDetails);
            setRows(location.state.data.products);    
        }
    }, [location.state]);

    return (
        <div className="App container mt-5">
            <CustomButton label="New Bill" type="submit" onclickFunction={logout}></CustomButton>
            <div id="divToPrint" className="m-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="d-flex flex-row p-2">
                                <div className="d-flex flex-column"> <span className="font-weight-bold">Tax Invoice</span> <small>{id}</small> </div>

                            </div>

                            <hr />
                            <div className="table-responsive p-2">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className="add">
                                            <td>To</td>
                                            <td>From</td>
                                        </tr>
                                        <tr className="content">
                                            <td className="font-weight-bold">{customerName}</td>
                                            <td className="font-weight-bold">Sparkle <br /> Attn: Suspendisse sapien nunc.<br /> Canada</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="table-responsive p-2">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className="add">
                                            <td>Description</td>
                                            <td className="text-center">Price</td>
                                        </tr>
                                        {rows.slice(0, rows.length - 2).map((row, index) => {
                                            return (
                                                <tr key={index} className="content">
                                                    <td>{row.productName}</td>
                                                    <td className="text-center">{row.price}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="table-responsive p-2">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className="add">
                                            <td></td>
                                            <td>Subtotal</td>
                                            <td>GST(10%)</td>
                                            <td className="text-center">Total</td>
                                        </tr>
                                        <tr className="content">
                                            <td></td>
                                            <td>{total - tax}</td>
                                            <td>{tax}</td>
                                            <td className="text-center">{total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="address p-2">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr className="add">
                                            <td>Payment Details</td>
                                        </tr>
                                        <tr className="content">
                                            <td> Payment Mode : {paymentDetails.paymentMode} <br /> Account Holder : {paymentDetails.accountHolder} <br /> Account Number : {paymentDetails.accountNumber}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Invoice;