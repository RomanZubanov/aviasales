import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Ticket from '../Ticket'
import Message from '../Message'
import Error from '../Error'

import { fetchSearchId, fetchTickets } from './ticketsListSlice'
import filterFunction from './helpers/filterFunction'
import sortFunction from './helpers/sortFunction'
import style from './TicketsList.module.css'

let key = 0

export default function TicketsList() {
  const [numberTicketsRender, setNumberTicketsRender] = useState(5)
  const [sortedTicketsPacks, setSortedTicketsPacks] = useState([])
  const [ticketsForRender, setTicketsForRender] = useState([])
  const [numberProcessedPacks, setNumberProcessedPacks] = useState(0)
  const [process, setProcess] = useState(null)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const searchId = useSelector((state) => state.ticketsList.searchId)
  const ticketsData = useSelector((state) => state.ticketsList.tickets)
  const ticketsLoadStatus = useSelector((state) => ({
    status: state.ticketsList.status,
    error: state.ticketsList.error,
  }))
  const stop = useSelector((state) => state.ticketsList.stop)
  const tryAfterError = useSelector((state) => state.ticketsList.tryAfterError)
  const sortMode = useSelector((state) => state.filterTickets)
  const filterMode = useSelector((state) => state.filterTransfer)

  const notEmptyFilter = Object.values(filterMode).includes(true)

  useEffect(() => {
    setNumberProcessedPacks(0)
    setSortedTicketsPacks([])
    setNumberTicketsRender(5)
  }, [filterMode])

  useEffect(() => {
    setNumberTicketsRender(5)
  }, [sortMode])

  useEffect(() => {
    if (searchId.status === 'idle') {
      dispatch(fetchSearchId())
    }
    if (searchId.status === 'failed') {
      if (searchId.error === 'Failed to fetch') {
        setError('Server does not answer. Check Your Internet Connection, Please')
      } else if (Number(searchId.error)) {
        setError(`Something gone wrong. Server response ${searchId.error}`)
      } else {
        setError(`Something gone wrong. Error message ${searchId.error}`)
      }
    }
  }, [searchId.status, searchId.error, dispatch])

  useEffect(() => {
    if (searchId.status === 'succeeded' && stop === false && tryAfterError <= 5) {
      dispatch(fetchTickets())
    }
  }, [ticketsData, searchId.status, stop, tryAfterError, dispatch])

  useEffect(() => {
    if (tryAfterError === 6) {
      if (ticketsLoadStatus.error === 'Failed to fetch') {
        setError('Server does not answer. Check Your Internet Connection, Please')
      } else if (Number(ticketsLoadStatus.error)) {
        setError(`Something gone wrong. Server response ${ticketsLoadStatus.error}`)
      } else {
        setError(`Something gone wrong. Error message ${ticketsLoadStatus.error}`)
      }
    }
  }, [tryAfterError, ticketsLoadStatus.error])

  useEffect(() => {
    let timerIdFilter = null
    if (numberProcessedPacks < ticketsData.length && notEmptyFilter) {
      setProcess('Фильтруем билеты')
      timerIdFilter = setTimeout(() => {
        const copyOneArrayTickets = JSON.parse(JSON.stringify(ticketsData[numberProcessedPacks]))
        const filteredArrayOfTickets = copyOneArrayTickets.filter(filterFunction(filterMode))
        setSortedTicketsPacks((state) => [...state, ...filteredArrayOfTickets])
        setNumberProcessedPacks(numberProcessedPacks + 1)
      }, 0)
    }
    if (numberProcessedPacks === ticketsData.length) {
      setProcess(null)
    }
    if (!notEmptyFilter) {
      setProcess(null)
      setTicketsForRender([])
    }
    return () => clearTimeout(timerIdFilter)
  }, [ticketsData, numberProcessedPacks, filterMode, notEmptyFilter])

  useEffect(() => {
    if (sortedTicketsPacks.length >= 0 && notEmptyFilter) {
      const copySortedTicketsPacks = JSON.parse(JSON.stringify(sortedTicketsPacks))
      copySortedTicketsPacks.sort(sortFunction(sortMode))
      setTicketsForRender(copySortedTicketsPacks.slice(0, numberTicketsRender))
    }
  }, [numberTicketsRender, sortedTicketsPacks, sortMode, filterMode, notEmptyFilter])

  const ticketsList = ticketsForRender.map((ticket) => <Ticket key={key++} ticket={ticket} />)

  function showMessage() {
    if (!stop && !error) {
      return <Message text="Загружаем билеты" showSpin progress={stop ? 0 : (ticketsData.length / 25) * 100} />
    }
    if (process) {
      return <Message text={process} showSpin progress={(numberProcessedPacks / ticketsData.length) * 100} />
    }
    if (ticketsForRender.length === 0 && !error) {
      return <Message text="Нет билетов, подходящих под выбранные фильтры" showSpin={false} />
    }
    if (error) {
      return <Error text={error} />
    }
    return null
  }

  const classButton = `${style.btn_show_more} ${
    sortedTicketsPacks.length <= numberTicketsRender ? style['btn_show_more--hidden'] : null
  }`

  return (
    <div>
      {showMessage()}
      <div className={style.tickets_list}>{ticketsList}</div>
      <button className={classButton} type="button" onClick={() => setNumberTicketsRender(numberTicketsRender + 5)}>
        Показать еще 5 билетов!
      </button>
    </div>
  )
}
