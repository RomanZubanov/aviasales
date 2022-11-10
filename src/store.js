import { configureStore } from '@reduxjs/toolkit'

import filterTransferReducer from './features/FilterTransfer/filterTransferSlice'
import filterTicketsReducer from './features/FilterTickets/filterTicketsSlice'
import ticketsListReducer from './features/TicketsList/ticketsListSlice'

export default configureStore({
  reducer: {
    filterTransfer: filterTransferReducer,
    filterTickets: filterTicketsReducer,
    ticketsList: ticketsListReducer,
  },
})
