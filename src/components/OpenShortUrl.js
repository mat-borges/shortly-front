import { useNavigate, useParams } from 'react-router-dom';

import { useEffect } from 'react';

export default function OpenShortUrl() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.open(`${process.env.REACT_APP_API_BASE_URL}/urls/open/${shortUrl}`);
    navigate('/');
  });
  return <></>;
}
