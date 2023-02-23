import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { insertEmployee } from '../redux/EmployeesSlice';
const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required Field"),
    phone: Yup.number().required("Required Field"),
    email: Yup.string().email('Invalid email').required('Required Field'),

});

const EmpCreate = () => {


    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.employees);

    return (
        <div>
            <Formik
                initialValues={{
                    name: "",
                    phone: "",
                    email: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    try {
                        dispatch(insertEmployee(values))
                        values.name = ""
                        values.email = ""
                        values.phone = ""
                        toast.success("Add New Employee Successful", {
                            theme: "dark",
                        });
                    } catch (error) {

                        toast.error(error.message, {
                            theme: "dark",
                        });
                    }

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
                                    <button type="submit" className='btn btn-success'>AddEmployee</button>
                                )
                            }
                        </div>
                    </Form>

                )}
            </Formik>
        </div>
    )
}

export default EmpCreate
