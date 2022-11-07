import { Spin, Progress } from 'antd'
import PropTypes from 'prop-types'

import style from './message.module.css'

export default function Message({ text, showSpin, progress }) {
  const spinner = showSpin ? <Spin /> : null
  const progressBar = progress > 0 ? <Progress percent={progress} showInfo={false} /> : null
  return (
    <div>
      <div className={style.message}>
        <div>
          {spinner}
          <span>{text}</span>
        </div>
      </div>
      {progressBar}
    </div>
  )
}

Message.defaultProps = {
  text: '',
  showSpin: false,
  progress: 0,
}

Message.propTypes = {
  text: PropTypes.string,
  showSpin: PropTypes.bool,
  progress: PropTypes.number,
}
