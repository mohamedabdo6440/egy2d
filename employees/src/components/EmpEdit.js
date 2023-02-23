import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editEmployee } from '../redux/EmployeesSlice'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required Field"),
    phone: Yup.number().required("Required Field"),
    email: Yup.string().email('Invalid email').required('Required Field'),

});


const EmpEdit = () => {





    const { isLoading } = useSelector(state => state.employees)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const employees = localStorage.getItem("employees")
    const SelectEmpData = JSON.parse(employees).filter((el) => {
        return el.id === +id;
    })
    const NameEmp = SelectEmpData.map((emp) => {
        return emp.name
    })
    const EmailEmp = SelectEmpData.map((emp) => {
        return emp.email
    })
    const phoneEmp = SelectEmpData.map((emp) => {
        return emp.phone
    })


    return (
        <div>
            <Formik
                initialValues={{
                    name: NameEmp[0],
                    phone: phoneEmp[0],
                    email: EmailEmp[0],
                    id,
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    dispatch(editEmployee(values))
                    !isLoading && navigate("/")
                }}
            >
                {({ errors, touched }) => (

                    <Form className="">


                        <div className="">
                            <Field
                                name="name"
                                id="form3Example3"
                                className="form-control w-75 m-auto"
                                placeholder="name"

                            />
                        </div>
                        <div className="text-danger || mb-4 || mt-2  ">
                            {errors.name && touched.name ? (
                                <div>{errors.name}</div>
                            ) : null}
                        </div>

                        <div className="">
                            <Field
                                name="email"
                                type="email"
                                id="form3Example4"
                                placeholder="E-mail"
                                className="form-control w-75 m-auto"
                            />
                        </div>

                        <div className="text-danger mb-4 mt-2 ">
                            {errors.email && touched.email ? (
                                <div>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="">
                            <Field
                                name="phone"
                                type="text"
                                id="form3Example4"
                                placeholder="Phone"
                                className="form-control w-75 m-auto"
                            />
                        </div>

                        <div className="text-danger mb-4 mt-2 ">
                            {errors.phone && touched.phone ? (
                                <div>{errors.phone}</div>
                            ) : null}
                        </div>
                        <div className="mt-2 || text-center">
                            {
                                isLoading ? (

                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    <button type="submit" className='btn btn-success'>Save</button>
                                )
                            }
                            <Link to="/" className="btn btn-danger px-4 mx-1 ">{"<<Back"}</Link>
                        </div>
                    </Form>

                )}
            </Formik>
        </div>




    )
}

export default EmpEdit
