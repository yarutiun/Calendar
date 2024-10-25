import style from './TopBar.module.css';
import avatar from '../img/icons/TopBar/avatar.png';
import icon_search from '../img/icons/TopBar/icon_search.svg';
import notification from '../img/icons/TopBar/notification.svg';
import message from '../img/icons/TopBar/message.svg';
import arrow from '../img/icons/TopBar/arrow.svg';
import help from '../img/icons/TopBar/help.svg';

const TopBar = () => {
  return (
    <div className={style.topMain}>
      <div className={style.searchBar}>
        <button><img src={icon_search} alt='search'/></button>
        <input type="text" placeholder="Search transactions, invoices or help" />
      </div>

      <div className={style.options}>
        <button><img src={help} alt='help'/></button>
        <button><img src={message} alt='message'/></button>
        <button><img src={notification} alt='search'/></button>
      </div>

      <div className={style.userSection}>
        <span className={style.userName}>John Doe</span>
        <button><img src={arrow} alt='arrow'/></button>
        <span><img src={avatar} alt='avatar'/></span>
      </div>
    </div>
  );
};

export default TopBar;
