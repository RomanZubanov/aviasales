import logo from './Logo.png';
import style from './Header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <img src={logo} alt="logo aviasales" />
    </header>
  );
}
