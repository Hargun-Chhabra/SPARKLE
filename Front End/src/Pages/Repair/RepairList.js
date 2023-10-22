//Vruitka kakadiya - B00927033 (vrutika.kakadiya@dal.ca)

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './modal.css'

const columns = [
    
    { id: 'name', label: 'Name' },
    { id: 'phonenumber', label: 'Phone Number' },
    { id: 'description', label: 'Description'},
    { id: 'estimatecost', label: 'Estimated Cost'},
    { id: 'status', label: 'Status' }
  ];

const rows = [
    { id: 1, name: 'John Doe', phonenumber: '567-7737733', description: '14KY Diamond Ring size 7',  estimatecost:'120',status:'NEW'},
    { id: 2, name: 'Jane Smith', phonenumber: '234-3567891', description: '10KY Bracelete', estimatecost:'75',status:'NEW'},
    { id: 3, name: 'Bob Johnson', phonenumber: '123-4567890', description: '10KW Diamond Ring size 6', estimatecost:'90',status:'COMPLETE' },
    { id: 4, name: 'Sue Davis', phonenumber: '567-7737733', description: '14KR Box link Chain',  estimatecost:'110',status:'NEW'},
    { id: 5, name: 'Jim Brown', phonenumber: '567-7737733', description: '10KY Ruby Ring of size 7', estimatecost:'150', status:'PENDING PICKUP'}
  ];

  function RepairList() {
   
    
  
    return (
        <div style={{ height: 400, width: '60%', margin: 'auto', marginTop: '3%' }}>
      <TableContainer component={Paper} 
          sx={{
          "& .MuiTableContainer-root .MuiTableHead-root": {
            borderRadius: '20px 20px 0px 0px',
            fontSize: 20,
            fontWeight: 'bold',
          },
          borderRadius: '20px',
          borderColor: 'white'
        }}>
        <Table aria-label="simple table" style={{borderColor:'white'}}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style = {{backgroundColor: '#bab79d',
                color: '#444454',
                fontSize: 20,
                
                
                }}>{column.label}</TableCell>
                
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow  >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phonenumber}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.estimatecost}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
        component="div"
        count={[5]}
        rowsPerPage={[1]}
        page={[1]}
       
      />
      </TableContainer>
     
      </div>
    );
  }
  
  export default RepairList;
  
  
  
  
  

