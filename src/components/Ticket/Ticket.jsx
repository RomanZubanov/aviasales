import PropTypes from 'prop-types'

import Info from '../Info'
import timeFormat from '../../helpers/timeFormat'
import durationFormat from '../../helpers/durationFormat'
import stopsQuantity from '../../helpers/stopsQuantity'

import style from './Ticket.module.css'

export default function Ticket({ ticket }) {
  const {
    price,
    carrier,
    segments: [
      {
        origin: originForward,
        destination: destinationForward,
        date: dateForward,
        stops: stopsForward,
        duration: durationForward,
      },
      { origin: originBack, destination: destinationBack, date: dateBack, stops: stopsBack, duration: durationBack },
    ],
  } = ticket

  const priceFormatted = `${Math.floor(price / 1000)} ${String(price).slice(-3)} Р`

  const departureTimeForward = timeFormat(dateForward)
  const arrivalTimeForward = timeFormat(dateForward, durationForward)
  const departureTimeBack = timeFormat(dateBack)
  const arrivalTimeBack = timeFormat(dateBack, durationBack)
  const durationForwardFormat = durationFormat(durationForward)
  const durationBackFormat = durationFormat(durationBack)

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.price}>{priceFormatted}</span>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt={`${carrier} logo`} />
      </div>
      <div className={style.info}>
        <Info
          title={`${originForward} – ${destinationForward}`}
          value={`${departureTimeForward} – ${arrivalTimeForward}`}
        />
        <Info title="В пути" value={durationForwardFormat} />
        <Info title={stopsQuantity(stopsForward)} value={stopsForward.join(', ')} />
      </div>
      <div className={style.info}>
        <Info title={`${originBack} – ${destinationBack}`} value={`${departureTimeBack} – ${arrivalTimeBack}`} />
        <Info title="В пути" value={durationBackFormat} />
        <Info title={stopsQuantity(stopsBack)} value={stopsBack.join(', ')} />
      </div>
    </div>
  )
}

Ticket.defaultProps = {
  ticket: {
    price: 0,
    carrier: '',
    segments: [
      {
        origin: '',
        destination: '',
        date: '',
        stops: [],
        duration: 0,
      },
      {
        origin: '',
        destination: '',
        date: '',
        stops: [],
        duration: 0,
      },
    ],
  },
}

Ticket.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number.isRequired,
    carrier: PropTypes.string.isRequired,
    segments: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.string)]))
    ),
  }),
}
