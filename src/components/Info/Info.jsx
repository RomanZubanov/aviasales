import style from './Info.module.css'

export default function Info({ title, value }) {
  return (
    <div className={style.info}>
      <span className={style.title}>{title}</span>
      <span className={style.value}>{value}</span>
    </div>
  )
}
