// import { useDemoApiQuery } from '../../Services/Api/module/demoApi';
import { Outlet } from 'react-router-dom';
import Body from '../body/Body';
import Header from '../header/Header';
// import { ROUTES } from '../../Shared/Constants';

export default function Dashboard() {
  //  const { data, error } = useDemoApiQuery('');
  // console.log(data, error);
  return (
    <div>
      Dashboard
      <Header />
      <Body />
      <Outlet />
      {/* <Prompt when message="Are you sure you want to leave?" /> */}
    </div>
  );
}
