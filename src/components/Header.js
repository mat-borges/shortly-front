import { detailColor, textBaseColor } from '../constants/colors.js';

import SideMenuComponent from './SideMenu.js';
import UserContext from '../contexts/UserContext.js';
import logo from '../assets/images/logo.svg';
import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <WelcomeText>{userInfo?.loggedIn ? <h1>Seja bem-vinde, {userInfo.name}!</h1> : <></>}</WelcomeText>
      <LogoBox>
        <h1 onClick={() => navigate('/')}>Shortly</h1>
        <img src={logo} alt='shortlyLogo' onClick={() => navigate('/')} />
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
    font-size: 3rem;
    line-height: 3rem;
    cursor: pointer;
  }
  img {
    height: 3.5rem;
    margin-left: 1rem;
    cursor: pointer;
  }
  @media (min-width: 660px) {
    h1 {
      font-size: 4rem;
      line-height: 4rem;
    }
    img {
      height: 5.5rem;
    }
  }
`;
