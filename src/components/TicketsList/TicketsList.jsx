import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Ticket from '../Ticket'

import { fetchSearchId, fetchTickets } from './ticketsListSlice'
import style from './TicketsList.module.css'

let key = 0

export default function TicketsList() {
  const dispatch = useDispatch()

  const searchId = useSelector((state) => state.ticketsList.searchId)
  const ticketsData = useSelector((state) => state.ticketsList)

  useEffect(() => {
    if (searchId.status === 'idle') {
      dispatch(fetchSearchId())
    }
    if (searchId.status === 'succeeded' && ticketsData.status === 'idle') {
      dispatch(fetchTickets(searchId.value))
    }
  }, [searchId.value, searchId.status, ticketsData.status, dispatch])

  const ticketsList = ticketsData.tickets.slice(0, 5).map((ticket) => <Ticket key={key++} ticket={ticket} />)

  // const ticketsList = [<Ticket key={1} />, <Ticket key={2} />, <Ticket key={3} />]

  return (
    <div>
      <div className={style.tickets_list}>{ticketsList}</div>
      <button className={style.btn_show_more} type="button">
        Показать еще 5 билетов!
      </button>
    </div>
  )
}
