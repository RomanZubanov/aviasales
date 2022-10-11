import TicketsList from '../TicketsList';
import FilterTop from '../FilterTop';
import Header from '../Header';
import FilterLeft from '../FilterLeft';

import style from './App.module.css';

export default function App() {
  return (
    <div>
      <Header />
      <main className={style.main}>
        <FilterLeft />
        <section className={style.main_content}>
          <FilterTop />
          <TicketsList />
        </section>
      </main>
    </div>
  );
}
