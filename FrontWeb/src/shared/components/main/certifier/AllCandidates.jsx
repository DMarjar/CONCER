import React, { useState } from 'react';
import Search from '../../Search';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

const AllCandidates = () => {
  const [first, setFirst] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const data = [
    { name: 'John Smith', country: { name: 'USA' }, company: 'ABC Inc.', representative: { name: 'Jane Doe' } },
    { name: 'Alice Johnson', country: { name: 'Canada' }, company: 'XYZ Ltd.', representative: { name: 'Bob Brown' } },
    { name: 'Juan Garcia', country: { name: 'Mexico' }, company: 'DEF SA', representative: { name: 'Maria Hernandez' } },
    { name: 'John Smith', country: { name: 'USA' }, company: 'ABC Inc.', representative: { name: 'Jane Doe' } },
    { name: 'Alice Johnson', country: { name: 'Canada' }, company: 'XYZ Ltd.', representative: { name: 'Bob Brown' } },
    { name: 'Juan Garcia', country: { name: 'Mexico' }, company: 'DEF SA', representative: { name: 'Maria Hernandez' } },
    { name: 'John Smith', country: { name: 'USA' }, company: 'ABC Inc.', representative: { name: 'Jane Doe' } },
    { name: 'Alice Johnson', country: { name: 'Canada' }, company: 'XYZ Ltd.', representative: { name: 'Bob Brown' } },
    // Agrega más objetos con datos adicionales aquí
  ];

  return (
    <>
      <h2 className="d-flex justify-content-center pt-3" style={{ color: "#2375d7" }}>Candidatos</h2>
      <Search handleSearch={handleSearch} handleInputChange={handleInputChange} />
      <hr />
      <DataTable value={filteredData.length ? filteredData : data} paginator rows={6}  
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
        <Paginator className='p-paginator-sm p-paginator-first-last' rows={5} totalRecords={filteredData.length ? filteredData.length : data.length} first={first} onPageChange={onPageChange}></Paginator>
      </DataTable>
    </>
  )
};

export default AllCandidates;
