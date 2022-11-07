import PropTypes from 'prop-types'

import style from './message.module.css'

export default function Error({ text }) {
  return (
    <div className={style.message}>
      <span>{text}</span>
    </div>
  )
}

Error.defaultProps = {
  text: 'Error',
}

Error.propTypes = {
  text: PropTypes.string,
}
