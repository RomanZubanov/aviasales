import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Ticket from '../Ticket'

import { fetchSearchId, fetchTickets } from './ticketsListSlice'
import style from './TicketsList.module.css'

let key = 0

export default function TicketsList() {
  const [numberTicketsRender, setNumberTicketsRender] = useState(5)
  const [sortedTicketsPacks, setSortedTicketsPacks] = useState([])
  const [ticketsForRender, setTicketsForRender] = useState([])
  const [numberProcessedPacks, setNumberProcessedPacks] = useState(0)

  const dispatch = useDispatch()

  const searchId = useSelector((state) => state.ticketsList.searchId)
  const ticketsData = useSelector((state) => state.ticketsList.tickets)
  const stop = useSelector((state) => state.ticketsList.stop)
  const tryAfterError = useSelector((state) => state.ticketsList.tryAfterError)
  const sortMode = useSelector((state) => state.filterTickets)
  const filterMode = useSelector((state) => state.filterTransfer)
  // const filterModeChange = useSelector((state) => state.filterTransfer.change)

  function filterFunction(mode) {
    const { all, noTransfer, oneTransfer, twoTransfer, threeTransfer } = mode
    if (all) {
      return () => true
    }
    if (noTransfer) {
      return (item) => item.segments[0].stops.length === 0
    }
    if (oneTransfer || twoTransfer || threeTransfer) {
      const quantityStopsArr = []
      if (oneTransfer) {
        quantityStopsArr.push(1)
      }
      if (twoTransfer) {
        quantityStopsArr.push(2)
      }
      if (threeTransfer) {
        quantityStopsArr.push(3)
      }
      return (item) => quantityStopsArr.includes(item.segments[0].stops.length)
    }
    return () => false
  }

  function sortFunction(mode) {
    if (mode === 'fastest') {
      return (a, b) => a.segments[0].duration - b.segments[0].duration
    }
    if (mode === 'optimal') {
      // return (a, b) => a.price * a.segments[0].duration - b.price * b.segments[0].duration
      return (a, b) => b.price - a.price
    }
    return (a, b) => a.price - b.price
  }

  useEffect(() => {
    setNumberProcessedPacks(0)
    setSortedTicketsPacks([])
  }, [sortMode, filterMode])

  useEffect(() => {
    if (searchId.status === 'idle') {
      dispatch(fetchSearchId())
    }
  }, [searchId.status, dispatch])

  useEffect(() => {
    if (searchId.status === 'succeeded' && stop === false && tryAfterError <= 5) {
      dispatch(fetchTickets())
    }
  }, [searchId.status, ticketsData, stop, tryAfterError, dispatch])

  useEffect(() => {
    if (numberProcessedPacks < ticketsData.length) {
      const copyOneArrayTickets = JSON.parse(JSON.stringify(ticketsData[numberProcessedPacks]))
      const filteredArrayOfTickets = copyOneArrayTickets.filter(filterFunction(filterMode))
      filteredArrayOfTickets.sort(sortFunction(sortMode))
      // const arrForPush = filteredArrayOfTickets.slice(0, 100)

      setSortedTicketsPacks((state) => [...state, ...filteredArrayOfTickets])
      setNumberProcessedPacks(numberProcessedPacks + 1)
    }
  }, [ticketsData, numberTicketsRender, numberProcessedPacks, sortMode, filterMode])

  useEffect(() => {
    if (sortedTicketsPacks.length >= 0) {
      const copySortedTicketsPacks = JSON.parse(JSON.stringify(sortedTicketsPacks))
      copySortedTicketsPacks.sort(sortFunction(sortMode))
      setTicketsForRender(copySortedTicketsPacks.slice(0, numberTicketsRender))
    }
  }, [numberTicketsRender, sortedTicketsPacks, sortMode, filterMode])

  const ticketsList = ticketsForRender.map((ticket) => <Ticket key={key++} ticket={ticket} />)

  return (
    <div>
      <div className={style.tickets_list}>{ticketsList}</div>
      <button
        className={style.btn_show_more}
        type="button"
        onClick={() => setNumberTicketsRender(numberTicketsRender + 5)}
      >
        Показать еще 5 билетов!
      </button>
    </div>
  )
}
