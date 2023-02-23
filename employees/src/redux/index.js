import { configureStore } from '@reduxjs/toolkit'
import AllEmployee from './EmployeesSlice'



export const store = configureStore({
    reducer: {
        employees: AllEmployee,
    },
})
