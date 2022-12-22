import { detailColor, textAccentColor, textDetailColor } from '../../constants/colors';
import { useContext, useEffect, useState } from 'react';

import Loading from '../../components/Loading';
import { ThreeDots } from 'react-loader-spinner';
import Urls from './Urls.js';
import UserContext from '../../contexts/UserContext';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.token) {
      navigate('/');
    } else {
      const config = { headers: { authorization: `Bearer ${localStorage.token}` } };
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/users/me`, config)
        .then((res) => {
          setLoading(false);
          setUrls(res.data.shortenedUrls);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [navigate, shortening, deleting]);

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
        swal({ title: 'Link encurtado', text: `Acesse através de: ${res.data.shortUrl}`, icon: 'success' });
      })
      .catch((err) => {
        handleError(err.response);
        setShortening(false);
        console.log(err);
      });
  }

  function handleError(error) {
    console.log(error);
    switch (error?.status) {
      case 401:
        swal({ title: `${error.status}: Não Autorizado`, icon: 'error' });
        break;
      case 422:
        swal({ title: `${error.status} ${error.statusText}`, text: `Insira uma URL válida!`, icon: 'error' });
        break;
      default:
        break;
    }
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
      {loading ? <Loading /> : <Urls setDeleting={setDeleting} urls={urls} />}
    </ShortenUrlContainer>
  );
}

const ShortenUrlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 2rem 0 2rem;
  margin-bottom: 3rem;
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
