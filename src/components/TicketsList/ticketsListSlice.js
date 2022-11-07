import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getSearchId from '../../services/getSearchId'
import getTickets from '../../services/getTickets'

export const fetchSearchId = createAsyncThunk('ticketsList/fetchSearchId', async () => getSearchId())

export const fetchTickets = createAsyncThunk('ticketsList/fetchTickets', async (_, { getState }) => {
  const searchId = getState().ticketsList.searchId.value
  return getTickets(searchId)
})

const initialState = {
  searchId: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    value: '',
    error: null,
  },
  tickets: [],
  status: 'idle',
  error: null,
  tryAfterError: 0,
  stop: false,
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
        state.tickets.push(action.payload.tickets)
        state.tryAfterError = 0
        state.stop = action.payload.stop
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed'
        if (Number(action.error.message) < 500) {
          state.tryAfterError = 6
        } else {
          state.tryAfterError += 1
        }
        state.error = action.error.message
      })
  },
})

export default ticketsListSlice.reducer
