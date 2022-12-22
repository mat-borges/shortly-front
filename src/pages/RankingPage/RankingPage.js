import { useContext, useEffect, useState } from 'react';

import { FaTrophy } from 'react-icons/fa';
import Loading from '../../components/Loading.js';
import UserContext from '../../contexts/UserContext.js';
import axios from 'axios';
import styled from 'styled-components';

export default function RankingPage() {
  const { userInfo } = useContext(UserContext);
  const [rankings, setRankings] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/ranking`)
      .then((res) => {
        setLoading(false);
        setRankings(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <RankingContainer>
      <Title>
        <TrophyIcon color='#FFD233' />
        <h1>Ranking</h1>
      </Title>
      <Rankings>
        {loading ? (
          <Loading />
        ) : (
          rankings?.map((ranking, i) => {
            return (
              <li key={i}>
                <h2>
                  {i + 1} . {ranking.name}
                </h2>
                <p>- {ranking.linksCount} links</p>
                <p>- {ranking.visitCount} visualizações</p>
              </li>
            );
          })
        )}
      </Rankings>
      {!userInfo?.loggedIn ? <Register>Crie sua conta para usar nosso serviço!</Register> : <></>}
    </RankingContainer>
  );
}

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 70px 2rem 0 2rem;
  @media (min-width: 660px) {
    padding-top: 100px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin-left: 1rem;
    font-weight: 700;
    font-size: 28px;
  }
  @media (min-width: 660px) {
    h1 {
      margin-left: 1rem;
      font-weight: 700;
      font-size: 36px;
    }
  }
`;

const TrophyIcon = styled(FaTrophy)`
  font-size: 40px;
  @media (min-width: 660px) {
    font-size: 50px;
  }
`;

const Rankings = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
  padding-top: 1em;
  border: 1px solid #78b15940;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  background-color: #f0f0f0;
  li {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1em;
    padding: 0 24px;
    font-size: 18px;
    p {
      margin-left: 1em;
    }
    h2 {
      font-weight: 500;
      margin: 0 0.5em;
    }
  }
  @media (min-width: 660px) {
    width: 70%;
    li {
      display: inline-flex;
      flex-direction: row;
      width: 100%;
      padding: 0 24px;
      font-size: 22px;
      p {
        margin-left: 0;
      }
    }
  }
`;

const Register = styled.h1`
  margin-top: 3rem;
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  @media (min-width: 660px) {
    font-size: 2rem;
  }
`;
