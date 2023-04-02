import React, { useState } from 'react';
import { ImSearch } from "react-icons/im";
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
const Search = () => {
  const [query, setQuery] = useState('');

  const onSearch = (query) => {
    console.log('Buscando candidatos con la consulta:', query);
    // lógica para filtrar la lista de candidatos con la consulta del usuario
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };


  return (
    <>
      <div className="container-fluid p-0 m-0">
        <Row className="p-0 m-0 container-fluid">
          <div className='w-50'>
            <form onSubmit={handleSearch} >
              <input
                type="text"
                placeholder="Buscar..."
                style={{ width: "60%" }}
                className='square border border-2 m-1'
                value={query}
                onChange={handleInputChange}
              />
              <button type="submit"><ImSearch size={"15px"} /></button>
            </form>
          </div >
          <div className='w-50 d-flex justify-content-end'>
            <Button className='ml-auto' style={{ backgroundColor: "#002e60" }}>Agregar</Button>
          </div>

        </Row>
      </div>
    </>
  )
}

export default Search