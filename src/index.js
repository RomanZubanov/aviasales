import ReactDOM from 'react-dom/client';
import 'normalize.css';

import App from './components/App';
import style from './index.module.css';
import 'antd/dist/antd.min.css';

function Wrapper() {
  return (
    <div className={style.wrapper}>
      <App />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Wrapper />);
