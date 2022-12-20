import { accentColor, baseColor, detailColor, textAccentColor } from '../constants/colors.js';

import { GrMenu } from 'react-icons/gr';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SideMenuComponent() {
  const navigate = useNavigate();
  const [sideMenu, setSideMenu] = useState(false);
  const [userData, setUserData] = useState({ isLogged: false });

  function signOut() {
    // const config = {
    //   headers: {
    //     authorization: `Bearer ${userData.token}`,
    //   },
    // };
    // swal('Log Out', 'Você tem certeza que deseja deslogar?', 'warning', { buttons: [true, true] }).then((res) => {
    //   if (res) {
    //     axios
    //       .delete(`${process.env.REACT_APP_API_BASE_URL}/sign-out`, config)
    //       .then((res) => {
    //         setUserData({});
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

  return (
    <SideMenuBox>
      <MenuIcon size='1.2rem' color={accentColor} onClick={() => setSideMenu(!sideMenu)} />
      <SideMenu display={sideMenu ? 'true' : 'false'} hide={!userData?.isLogged ? 'true' : 'false'}>
        <h1>
          <li onClick={() => navigate('/')}>Home</li>
        </h1>
        <h2>
          <li onClick={() => navigate('/signIn')}>Entrar</li>
        </h2>
        <h2>
          <li onClick={() => navigate('/signUp')}>Cadastrar-se</li>
        </h2>
        <h1>
          <li onClick={() => navigate('/ranking')}>Ranking</li>
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
`;
