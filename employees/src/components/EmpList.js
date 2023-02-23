import React, { useEffect, useState } from 'react';
import EmpCreate from './EmpCreate';
import { getAllEmployee, deleteEmployee } from '../redux/EmployeesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const EmpList = () => {

    const dispatch = useDispatch()
    const { AllEmployee, isLoading } = useSelector(state => state.employees)
    const [openForm, setOpenForm] = useState(false)

    const handleShowForm = () => {
        if (openForm === false) {
            setOpenForm(true)
        } else {
            setOpenForm(false)
        }
    }

    useEffect(() => {
        dispatch(getAllEmployee());
    }, [dispatch])

    localStorage.setItem("employees", JSON.stringify(AllEmployee));

    return (
        <div>
            <h1>Employees Table</h1>

            <div className='container my-3 text-center'>
                <span onClick={handleShowForm} className='btn btn-primary'>Add New Employee</span>
                {
                    openForm && (
                        <div className='card w-50 m-auto py-3 my-3 bg-light'>
                            <EmpCreate />
                        </div>
                    )
                }
            </div>
            <table className="table table-bordered">
                <thead className='bg-dark text-white fs-5'>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>E-mail</td>
                        <td>Phone</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? (
                            <tr className="spinner-border text-primary" role="status">
                                <td className="visually-hidden">Loading...</td>
                            </tr>
                        ) : (
                            AllEmployee.length !== 0 ? (

                                AllEmployee.map((employee) => {

                                    return (
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.phone}</td>
                                            <td>
                                                <span onClick={() => { dispatch(deleteEmployee(employee.id)) }} className='btn btn-danger mx-1'>Remove</span>
                                                <Link className='btn btn-success mx-1' to={`employee/edit/${employee.id}`}>Edit</Link>
                                            </td>
                                        </tr>
                                    )
                                })

                            ) : (
                                <tr className="spinner-border text-primary" role="status">
                                    <td className="visually-hidden">Loading...</td>
                                </tr>
                            )
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}

export default EmpList
