import Info from '../Info'

import style from './Ticket.module.css'
import logo from './s7-logo.png'

export default function Ticket() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.price}>13 400 Р</span>
        <img src={logo} alt="s7-logo" />
      </div>
      <div className={style.info}>
        <Info title="MOW – HKT" value="10:45 – 08:00" />
        <Info title="В пути" value="21ч 15м" />
        <Info title="2 пересадки" value="HKG, JNB" />
      </div>
      <div className={style.info}>
        <Info title="MOW – HKT" value="11:20 – 00:50" />
        <Info title="В пути" value="13ч 30м" />
        <Info title="1 пересадка" value="HKG" />
      </div>
    </div>
  )
}
