import { createSlice } from '@reduxjs/toolkit'

export const filterTicketsSlice = createSlice({
  name: 'filterTickets',
  initialState: 'cheapest',
  reducers: {
    setCheapest: () => 'cheapest',
    setFastest: () => 'fastest',
    setOptimal: () => 'optimal',
  },
})

export const { setCheapest, setFastest, setOptimal } = filterTicketsSlice.actions

export const selectFilterTickets = (state) => state.filterTickets

export default filterTicketsSlice.reducer
