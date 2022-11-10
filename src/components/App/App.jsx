import TicketsList from '../../features/TicketsList'
import FilterTickets from '../../features/FilterTickets'
import Header from '../Header'
import FilterTransfer from '../../features/FilterTransfer'

import style from './App.module.css'

export default function App() {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.main}>
        <FilterTransfer />
        <section className={style.main_content}>
          <FilterTickets />
          <TicketsList />
        </section>
      </main>
    </div>
  )
}
