import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Ticket from '../../components/Ticket'
import Message from '../../components/Message'
import Error from '../../components/Error'

import { fetchSearchId, fetchTickets } from './ticketsListSlice'
import filterFunction from './helpers/filterFunction'
import sortFunction from './helpers/sortFunction'
import style from './TicketsList.module.css'

let key = 0

export default function TicketsList() {
  const [numberTicketsRender, setNumberTicketsRender] = useState(5)
  const [renderedTickets, setRenderedTickets] = useState([])

  const dispatch = useDispatch()

  const searchId = useSelector((state) => state.ticketsList.searchId)
  const ticketsData = useSelector((state) => state.ticketsList.tickets)
  const errorMessage = useSelector((state) => state.ticketsList.error)
  const stop = useSelector((state) => state.ticketsList.stop)
  const tryAfterError = useSelector((state) => state.ticketsList.tryAfterError)
  const sortMode = useSelector((state) => state.filterTickets)
  const filterMode = useSelector((state) => state.filterTransfer)

  const notEmptyFilter = Object.values(filterMode).includes(true)

  useEffect(() => {
    setNumberTicketsRender(5)
  }, [filterMode, sortMode])

  useEffect(() => {
    if (searchId.status === 'idle') {
      dispatch(fetchSearchId())
    }
  }, [searchId.status, dispatch])

  useEffect(() => {
    if (searchId.status === 'succeeded' && !stop && tryAfterError <= 5) {
      dispatch(fetchTickets())
    }
  }, [ticketsData, searchId.status, stop, tryAfterError, dispatch])

  useEffect(() => {
    const renderTickets = () => {
      if (notEmptyFilter) {
        return JSON.parse(JSON.stringify(ticketsData))
          .filter(filterFunction(filterMode))
          .sort(sortFunction(sortMode))
          .slice(0, numberTicketsRender)
          .map((ticket) => <Ticket key={key++} ticket={ticket} />)
      }
      return []
    }
    setRenderedTickets(renderTickets())
  }, [filterMode, sortMode, notEmptyFilter, numberTicketsRender, ticketsData])

  const showError = () => {
    if (searchId.status === 'failed' || tryAfterError === 6) {
      if (errorMessage === 'Failed to fetch') {
        return <Error text="Server does not answer. Check Your Internet Connection, Please" />
      }
      if (Number(errorMessage)) {
        return <Error text={`Something gone wrong. Server response ${errorMessage}`} />
      }
      return <Error text={`Something gone wrong. Error message ${errorMessage}`} />
    }
    return null
  }

  const showMessage = () => {
    if (!stop) {
      return <Message text="Загружаем билеты" showSpin progress={ticketsData.length / 100} />
    }
    if (renderedTickets.length === 0) {
      return <Message text="Нет билетов, подходящих под выбранные фильтры" />
    }
    return null
  }

  const classButton = `${style.btn_show_more} ${
    !stop || renderedTickets.length === 0 ? style['btn_show_more--hidden'] : null
  }`

  return (
    <div>
      {showError() || showMessage()}
      <div className={style.tickets_list}>{renderedTickets}</div>
      <button className={classButton} type="button" onClick={() => setNumberTicketsRender(numberTicketsRender + 5)}>
        Показать еще 5 билетов!
      </button>
    </div>
  )
}
