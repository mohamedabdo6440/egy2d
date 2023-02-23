import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


//get employees from api
export const getAllEmployee = createAsyncThunk('employees/getAllEmployee', async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {

        const res = await fetch('https://fakeserver.onrender.com/employees');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//insert employee 
export const insertEmployee = createAsyncThunk('employees/insertEmployee', async (AddEmployee, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('https://fakeserver.onrender.com/employees', {
            method: 'POST',
            body: JSON.stringify(AddEmployee),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//delete employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`https://fakeserver.onrender.com/employees/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});


//Edit employee
export const editEmployee = createAsyncThunk('employees/editEmployee', async (Employee, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`https://fakeserver.onrender.com/employees/${Employee.id}`, {
            method: 'PUT',
            body: JSON.stringify(Employee),
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
        });

        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const EmployeesSlice = createSlice({
    name: 'employees',
    initialState: {
        AllEmployee: [{}],
        isLoading: false,
        error: null,
    },
    extraReducers: {

        //get products
        [getAllEmployee.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getAllEmployee.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllEmployee = action.payload;
        },
        [getAllEmployee.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //insert new product
        [insertEmployee.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [insertEmployee.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllEmployee.push(action.payload);
        },
        [insertEmployee.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //delete employee
        [deleteEmployee.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteEmployee.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllEmployee = state.AllEmployee.filter(emp => emp.id !== action.payload);
        },
        [deleteEmployee.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //Edit employee 
        [editEmployee.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [editEmployee.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.AllEmployee.map((employee) => {
                if (employee.id === action.payload.id) {
                    employee.name = action.payload.name;
                    employee.email = action.payload.email;
                    employee.phone = action.payload.phone;
                }
            })
        },
        [editEmployee.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }

});



export default EmployeesSlice.reducer;