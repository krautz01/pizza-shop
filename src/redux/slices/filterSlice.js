import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const initialState = {
    categoryID: 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: "rating",
    },
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryID: (state, action) => {
           state.categoryID = action.payload
        },
        setSort: (state, action) => {
           state.sort = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
         },
        setFilters: (state, action) => {
            state.sort = action.payload.sort
            state.currentPage = Number(action.payload.currentPage)
            state.categoryID = Number(action.payload.categoryID)
        },
    },
})
export const { setCategoryID, setSort, setCurrentPage, setFilters } = filterSlice.actions // actions то же самое что и reducers сверху

export default filterSlice.reducer