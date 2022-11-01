import { configureStore } from '@reduxjs/toolkit'

import filterTransferReducer from './components/FilterTransfer/filterTransferSlice'
import filterTicketsReducer from './components/FilterTickets/filterTicketsSlice'
import ticketsListReducer from './components/TicketsList/ticketsListSlice'

export default configureStore({
  reducer: {
    filterTransfer: filterTransferReducer,
    filterTickets: filterTicketsReducer,
    ticketsList: ticketsListReducer,
  },
})
