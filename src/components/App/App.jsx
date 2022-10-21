import TicketsList from '../TicketsList'
import FilterTop from '../FilterTop'
import Header from '../Header'
import FilterTransfer from '../FilterTransfer'

import style from './App.module.css'

export default function App() {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.main}>
        <FilterTransfer />
        <section className={style.main_content}>
          <FilterTop />
          <TicketsList />
        </section>
      </main>
    </div>
  )
}
