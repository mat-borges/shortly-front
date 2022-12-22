import { accentColor, detailColor, textAccentColor, textDetailColor } from '../constants/colors';
import { useContext, useEffect, useState } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function ShortenUrlPage() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState('');
  const [shortening, setShortening] = useState(false);
  const [urls, setUrls] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!userInfo.loggedIn) {
      navigate('/');
    } else {
      const config = { headers: { authorization: `Bearer ${userInfo.token}` } };
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/users/me`, config)
        .then((res) => {
          setUrls(res.data.shortenedUrls);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userInfo.loggedIn, userInfo.token, navigate, shortening, deleting]);

  function shortenUrl(e) {
    e.preventDefault();
    const body = { url: form };
    const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
    setShortening(true);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/urls/shorten`, body, config)
      .then((res) => {
        setShortening(false);
        setForm('');
        console.log(res.data);
        swal({ title: 'Link encurtado', text: `Acesse através de: ${res.data.shortUrl}`, icon: 'success' });
      })
      .catch((err) => {
        handleError(err.response);
        setShortening(false);
        console.log(err);
      });
  }

  function handleError(error) {
    switch (error?.status) {
      case 401:
        swal({ title: `${error.status}: Não Autorizado`, icon: 'error' });
        break;
      default:
        break;
    }
  }

  function deleteUrl(id) {
    const config = { headers: { authorization: `Bearer ${userInfo.token}` } };
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

  return (
    <ShortenUrlContainer>
      <ShortenUrl onSubmit={shortenUrl}>
        <input
          type='text'
          value={form}
          placeholder='Links que cabem no bolso'
          onChange={(e) => setForm(e.target.value)}
          disabled={shortening ? 'disabled' : ''}
          required
        />
        <button type='submit' disabled={shortening ? 'disabled' : ''}>
          {shortening ? <ThreeDots color={textAccentColor} width='60' /> : 'Encurtar Link'}
        </button>
      </ShortenUrl>
      <Urls>
        {urls.map((url) => {
          return (
            <li id={url.id} key={url.id}>
              <div>
                <p>{url.url}</p>
                <p>{url.shortUrl}</p>
                <p>Quatidade de Visitantes: {url.visitCount}</p>
              </div>
              <div onClick={() => deleteUrl(url.id)}>
                <FaTrashAlt size={'1.5rem'} color={'#EA4F4F'} />
              </div>
            </li>
          );
        })}
      </Urls>
    </ShortenUrlContainer>
  );
}

const ShortenUrlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 2rem 0 2rem;
  @media (min-width: 660px) {
    padding-top: 10rem;
  }
`;

const ShortenUrl = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  input {
    width: 100%;
    height: 3rem;
    border-radius: 0.8rem;
    border: 1px solid #78b15940;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    padding: 1rem;
    font-size: 1rem;
    ::placeholder {
      font-size: 1rem;
      color: ${textDetailColor};
    }
    :focus {
      outline: 1px solid ${detailColor};
    }
  }
  button[type='submit'] {
    width: 40%;
    height: 3rem;
    margin-top: 1rem;
    border: none;
    border-radius: 0.8rem;
    color: ${textAccentColor};
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    background-color: ${detailColor};
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      transform: scale(1.1);
    }
  }
  @media (min-width: 660px) {
    flex-direction: row;
    height: 3rem;
    input {
      width: 60%;
    }
    button[type='submit'] {
      width: 15%;
      margin-top: 0;
      margin-left: 4rem;
    }
  }
`;

const Urls = styled.ul`
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
