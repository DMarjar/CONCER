import React, {useEffect, useState} from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AxiosClient from '../../../shared/http-client.gateway';
import Swal from "sweetalert2";


export const EditPerson = () => {





    return (
        <>
            <Container className='px-5 mt-3'>
                <h4 className='text-center' style={{ color: "#002e60" }}>Cuentas</h4>
            </Container>
        </>
    );
};

export default EditPerson;