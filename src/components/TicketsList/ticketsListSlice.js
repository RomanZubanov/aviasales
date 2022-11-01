import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getSearchId from '../../services/getSearchId'
import getTickets from '../../services/getTickets'

export const fetchSearchId = createAsyncThunk('ticketsList/fetchSearchId', async () => getSearchId())

export const fetchTickets = createAsyncThunk('ticketsList/fetchTickets', async (searchId) => getTickets(searchId))

const initialState = {
  searchId: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    value: '',
    error: null,
  },
  tickets: [],
  status: 'idle',
  error: null,
}

const ticketsListSlice = createSlice({
  name: 'ticketsList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.searchId.status = 'loading'
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId.status = 'succeeded'
        state.searchId.value = action.payload.searchId
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.searchId.status = 'failed'
        state.searchId.error = action.error.message
      })
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tickets = action.payload.tickets
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default ticketsListSlice.reducer
