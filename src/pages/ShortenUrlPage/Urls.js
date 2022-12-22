import { accentColor, textAccentColor } from '../../constants/colors';

import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';

export default function Urls({ setDeleting, urls }) {
  function deleteUrl(id) {
    const config = { headers: { authorization: `Bearer ${localStorage.token}` } };
    swal({ text: 'Certeza que deseja exluir essa URL?', icon: 'warning', buttons: [true, true] }).then((res) => {
      if (res) {
        setDeleting(true);
        axios
          .delete(`${process.env.REACT_APP_API_BASE_URL}/urls/${id}`, config)
          .then((res) => {
            setDeleting(false);
            swal({ title: 'URL deletada com sucesso!', icon: 'success' });
          })
          .catch((err) => {
            setDeleting(false);
            console.log(err);
          });
      } else {
        setDeleting(false);
        return;
      }
    });
  }

  const openUrl = (shortUrl) => window.open(`${process.env.REACT_APP_API_BASE_URL}/urls/open/${shortUrl}`);

  return (
    <UrlsContainer>
      {urls?.map((url) => {
        return (
          <li id={url.id} key={url.id}>
            <div>
              <p onClick={() => window.open(url.url)}>{url.url}</p>
              <p onClick={() => openUrl(url.shortUrl)}>{url.shortUrl}</p>
              <p>Quatidade de Visitantes: {url.visitCount}</p>
            </div>
            <div onClick={() => deleteUrl(url.id)}>
              <FaTrashAlt size={'1.5rem'} color={'#EA4F4F'} />
            </div>
          </li>
        );
      })}
    </UrlsContainer>
  );
}

const UrlsContainer = styled.ul`
  margin-top: 4rem;
  overflow-y: auto;
  height: 40vh;
  li {
    display: flex;
    height: 6rem;
    margin-bottom: 2rem;
  }
  li > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    :first-of-type {
      padding: 0 2rem;
      align-items: flex-start;
      background-color: ${accentColor};
      color: ${textAccentColor};
      width: 80%;
      display: flex;
      justify-content: space-around;
      border-radius: 1rem 0 0 1rem;
    }
    :last-of-type {
      width: 20%;
      border-radius: 0 1rem 1rem 0;
      background-color: ${textAccentColor};
    }
  }
  li > div > p {
    :first-of-type {
      text-decoration: underline;
      cursor: pointer;
    }
    :nth-child(2) {
      cursor: pointer;
    }
  }
  @media (min-width: 1000px) {
    height: 50vh;
    li {
      height: 3rem;
    }
    li > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      :first-of-type {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      :last-of-type {
        width: 10%;
      }
    }
  }
`;
