import { detailColor, textBaseColor } from '../constants/colors.js';

import SideMenuComponent from './SideMenu.js';
import UserContext from '../contexts/UserContext.js';
import logo from '../assets/images/logo.svg';
import styled from 'styled-components';
import { useContext } from 'react';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  return (
    <HeaderContainer>
      <WelcomeText>{userInfo?.loggedIn ? <h1>Seja bem-vinde, pessoa!</h1> : <></>}</WelcomeText>
      <LogoBox>
        <h1>Shortly</h1>
        <img src={logo} alt='shortlyLogo' />
      </LogoBox>
      <SideMenuComponent />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100px;
  margin-top: 2rem;
  padding: 0 2rem;
  font-size: 14px;
`;

const WelcomeText = styled.div`
  width: 65%;
  color: ${detailColor};
`;

const LogoBox = styled.div`
  display: flex;
  position: absolute;
  top: 3rem;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  text-align: center;
  h1 {
    color: ${textBaseColor};
    font-weight: 200;
    font-size: 4rem;
    line-height: 4rem;
  }
  img {
    height: 5.5rem;
    margin-left: 1rem;
  }
`;
