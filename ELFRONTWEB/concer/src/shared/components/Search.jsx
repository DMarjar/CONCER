import React, { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import { ImSearch } from 'react-icons/im';

export const Search = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(query);
    };

    return (
        <div className="container-fluid p-0 m-0">
            <Row className="p-0 m-0 container-fluid justify-content-between align-items-center">
                <div className="col-8 col-md-6">
                    <form onSubmit={handleSearch} className="d-flex align-items-center">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="form-control border-2 shadow-none "
                            value={query}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="btn btn-link shadow-none">
                            <ImSearch size={"15px"} />
                        </button>
                    </form>
                </div>
                <div className="col-4 col-md-6 d-flex justify-content-end">
                    <Button className='ml-auto' style={{ backgroundColor: "#002e60" }}>Agregar</Button>
                </div>
            </Row>
        </div>
    )
}

export default Search