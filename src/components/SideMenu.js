import { accentColor, baseColor, detailColor, textAccentColor, textDetailColor } from '../constants/colors.js';
import { useContext, useState } from 'react';

import { GrMenu } from 'react-icons/gr';
import UserContext from '../contexts/UserContext.js';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function SideMenuComponent() {
  const navigate = useNavigate();
  const [sideMenu, setSideMenu] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  function signOut() {
    // const config = {
    //   headers: {
    //     authorization: `Bearer ${userInfo.token}`,
    //   },
    // };
    // swal('Log Out', 'Você tem certeza que deseja deslogar?', 'warning', { buttons: [true, true] }).then((res) => {
    //   if (res) {
    //     axios
    //       .delete(`${process.env.REACT_APP_API_BASE_URL}/sign-out`, config)
    //       .then((res) => {
    //         setUserInfo({});
    //         localStorage.removeItem('userE-geek');
    //         swal({ text: 'Você foi deslogado com sucesso', icon: 'success' });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     navigate('/');
    //   }
    // });
  }

  function handleMenu(e) {
    navigate(`/${e.target.id}`);
    setSideMenu(!sideMenu);
  }

  return (
    <SideMenuBox>
      <MenuIcon size='1.2rem' color={accentColor} onClick={() => setSideMenu(!sideMenu)} />
      <SideMenu display={sideMenu ? 'true' : 'false'} hide={!userInfo?.loggedIn ? 'true' : 'false'}>
        <h1>
          <li id='' onClick={handleMenu}>
            Home
          </li>
        </h1>
        <h2>
          <li id='signIn' onClick={handleMenu}>
            Entrar
          </li>
        </h2>
        <h2>
          <li id='signUp' onClick={handleMenu}>
            Cadastrar-se
          </li>
        </h2>
        <h1>
          <li id='ranking' onClick={handleMenu}>
            Ranking
          </li>
        </h1>
        <h1>
          <li onClick={signOut}>Sair</li>
        </h1>
      </SideMenu>
    </SideMenuBox>
  );
}

const SideMenuBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const MenuIcon = styled(GrMenu)`
  margin-right: 15px;
  color: ${accentColor};
  cursor: pointer;
  background-color: ${baseColor};
  transition: all 0.5s;
  :hover {
    transform: rotate(180deg);
  }
  @media (min-width: 660px) {
    display: none;
  }
`;

const SideMenu = styled.ul`
  display: ${(props) => (props.display === 'true' ? 'initial' : 'none')};
  position: absolute;
  top: 1.5rem;
  right: 0;
  width: 20vw;
  min-width: 8rem;
  max-width: 10rem;
  height: fit-content;
  border: 1px solid ${accentColor};
  border-radius: 5px;
  font-weight: 600px;
  font-size: 0.9em;
  background-color: ${detailColor};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    color: ${textAccentColor};
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
  }
  h1,
  h2 {
    margin: 0 10px;
    border-bottom: 1px solid ${accentColor};
    :last-of-type {
      border: none;
    }
  }
  h2 {
    display: ${(props) => (props.hide === 'true' ? 'inherit' : 'none')};
  }
  h1 {
    display: ${(props) => (props.hide === 'true' ? 'none' : 'inherit')};
  }
  @media (min-width: 660px) {
    display: flex;
    position: initial;
    width: fit-content;
    min-width: auto;
    max-width: auto;
    background-color: ${baseColor};
    border: none;
    box-shadow: none;
    li {
      width: fit-content;
      color: ${textDetailColor};
      border: none;
      text-transform: none;
    }
    h1,
    h2 {
      border: none;
    }
    h2 {
      :first-of-type {
        li {
          color: ${accentColor};
        }
      }
    }
    h1 {
      :last-of-type {
        li {
          text-decoration: underline;
          font-weight: bold;
        }
      }
    }
  }
`;
