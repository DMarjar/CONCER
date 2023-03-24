import React, { useState } from 'react';
import Search from '../../Search';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

        

const AllCandidates = () => {
  const [first, setFirst] = useState(0); // Definir la variable first en el estado
  const [rows, setRows] = useState(5); // Definir la variable rows en el estado
  const onPageChange = (event) => { // Definir la función onPageChange
    setFirst(event.first);
    setRows(event.rows);
  };
  const data = [
    { name: 'John Smith', country: { name: 'USA' }, company: 'ABC Inc.', representative: { name: 'Jane Doe' } },
    { name: 'Alice Johnson', country: { name: 'Canada' }, company: 'XYZ Ltd.', representative: { name: 'Bob Brown' } },
    { name: 'Juan Garcia', country: { name: 'Mexico' }, company: 'DEF SA', representative: { name: 'Maria Hernandez' } },{ name: 'John Smith', country: { name: 'USA' }, company: 'ABC Inc.', representative: { name: 'Jane Doe' } },
    { name: 'Alice Johnson', country: { name: 'Canada' }, company: 'XYZ Ltd.', representative: { name: 'Bob Brown' } },
    { name: 'Juan Garcia', country: { name: 'Mexico' }, company: 'DEF SA', representative: { name: 'Maria Hernandez' } },{ name: 'John Smith', country: { name: 'USA' }, company: 'ABC Inc.', representative: { name: 'Jane Doe' } },
    { name: 'Alice Johnson', country: { name: 'Canada' }, company: 'XYZ Ltd.', representative: { name: 'Bob Brown' } },
    { name: 'Juan Garcia', country: { name: 'Mexico' }, company: 'DEF SA', representative: { name: 'Maria Hernandez' } }
    // Agrega más objetos con datos adicionales aquí
  ];
  

  return (
    <>
    
    <h2 className="d-flex justify-content-center pt-3" style={{ color: "#2375d7" }}>Candidatos</h2>
    <Search />
    <hr />
    <DataTable value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
      tableStyle={{ 
        minWidth: '50rem', 
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px #ccc',
        backgroundColor: '#fff',
        color: '#000',
        padding: '10px',
        margin: '0 auto'
      }}>
      <Column field="name" header="Name" style={{ width: '25%' }}></Column>
      <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
      <Column field="company" header="Company" style={{ width: '25%' }}></Column>
      <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
      
        <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
      </DataTable>
    </>

  )
    


}




export default AllCandidates