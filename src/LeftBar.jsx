import style from './LeftBar.module.css';
import invoices from '../img/icons/invoices.svg';
import help from '../img/icons/help.svg';
import settings from '../img/icons/settings.svg';
import calendar from '../img/icons/calendar.svg';
import home from '../img/icons/home.svg';
import inbox from '../img/icons/inbox.svg';
import dash from '../img/icons/dash.png';
import user from '../img/icons/user.png';
import TopBar from './TopBar'
import chat from '../img/icons/chat.png';
import products from '../img/icons/products.png';

const LeftBar = () => {
  return (
      <div className={style.mainContainer}>
        <TopBar />
        <h3 className={style.impekable}><div className={style.word}>I M P E K A B L E</div></h3>
        <div className={style.secondContainer}>
            <div className={style.leftBot}>
                <button className={style.home}><img src={home} alt='Home'/>Home</button>
                <button><img src={dash} alt='Dashboard' className={style.pic}/> Dashboard</button>
                <button><img src={inbox} alt='Inbox'/>Inbox</button>
                <button><img src={products} alt='Products' className={style.pic}/>Products</button>
                <button><img src={invoices} alt='Invoices'/>Invoices</button>
                <button> <img src={user} alt='Customers' className={style.pic}/>Customers</button>
                <button><img src={chat} alt='Chat' className={style.pic}/>Chat Room</button>
                <button className={style.cal}><img src={calendar} alt='Calendar'/>Calendar</button>
                <button> <img src={help} alt='Help'/>Help Center</button>
                <button><img src={settings} alt='Settings'/>Settings</button>
            </div>
        </div>
    </div>
  )
};

export default LeftBar;