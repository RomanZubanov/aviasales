import Ticket from '../Ticket'

import style from './TicketsList.module.css'

export default function TicketsList() {
  const ticketsList = [<Ticket key={1} />, <Ticket key={2} />, <Ticket key={3} />]

  return (
    <div>
      <div className={style.tickets_list}>{ticketsList}</div>
      <button className={style.btn_show_more} type="button">
        Показать еще 5 билетов!
      </button>
    </div>
  )
}
