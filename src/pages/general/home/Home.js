import { NavLink } from 'react-router-dom';
import HomeTemplate from '../../../components/templates/general/HomeTemplate';

const homeStyle = {
  minHeight: '100px',
};

export default function Home() {
  return (
    <HomeTemplate>
      <div style={homeStyle}>이거 홈 맞지?
        <div>
          <NavLink to={"profile/@hhe1b8"}>
            <img src="https://d3mcojo3jv0dbr.cloudfront.net/2021/02/24/20/20/d7133b09db1a5fbac0d5cea8433ec8a4.jpeg?w=64&h=64&q=65" />
            공부하는 여우원숭이 프로필 이동
          </NavLink>
        </div>
        <div>
        <NavLink to={"channel/buksan"}>
          <h1>BUKSAN 채널 바로가기</h1>
        </NavLink>
        <NavLink to={"post/create"}>
          <h1>POST CREATE 바로가기</h1>
        </NavLink>
        </div>
      </div>
    </HomeTemplate>
  );
}
