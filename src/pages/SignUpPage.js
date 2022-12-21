import { detailColor, textAccentColor, textDetailColor } from '../constants/colors';

import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [registering, setRegistering] = useState(false);

  function signUp(e) {
    e.preventDefault();
    setRegistering(true);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/signUp`, form)
      .then((res) => {
        swal('Sucesso', 'Usuário cadastrado com sucesso!', 'success');
        setRegistering(false);
        navigate('/');
      })
      .catch((err) => {
        setRegistering(false);
        console.log(err);
      });
  }

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <SignUpContainer>
      <SignUp onSubmit={signUp}>
        <input
          type='text'
          name='name'
          placeholder='Nome'
          value={form.name}
          onChange={handleForm}
          disabled={registering ? 'disabled' : ''}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='E-mail'
          value={form.email}
          onChange={handleForm}
          disabled={registering ? 'disabled' : ''}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Senha'
          value={form.password}
          onChange={handleForm}
          disabled={registering ? 'disabled' : ''}
          required
        />
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirmar Senha'
          value={form.confirmPassword}
          onChange={handleForm}
          disabled={registering ? 'disabled' : ''}
          required
        />
        <button type='submit' disabled={registering ? 'disabled' : ''}>
          {registering ? <ThreeDots color={textAccentColor} width='60' /> : 'Criar Conta'}
        </button>
      </SignUp>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 2rem 0 2rem;
  @media (min-width: 660px) {
    padding-top: 10rem;
  }
`;

const SignUp = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 100%;
    height: 3rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    border: 1px solid #78b15940;
    border-radius: 0.8rem;
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    ::placeholder {
      font-size: 1rem;
      color: ${textDetailColor};
    }
    :focus {
      outline: 1px solid ${detailColor};
    }
  }
  button[type='submit'] {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 3rem;
    border: none;
    border-radius: 0.8rem;
    color: ${textAccentColor};
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    background-color: ${detailColor};
    :hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      transform: scale(1.1);
    }
  }
  @media (min-width: 660px) {
    input {
      width: 80%;
    }
    button[type='submit'] {
      width: 20%;
      font-size: 0.8rem;
    }
  }
`;
