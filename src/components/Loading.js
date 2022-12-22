import { accentColor, detailColor, textAccentColor } from '../constants/colors.js';

import { ThreeCircles } from 'react-loader-spinner';
import styled from 'styled-components';

export default function Loading({ size }) {
  return (
    <LoadingContainer>
      <ThreeCircles
        height={!size ? 130 : size}
        width={!size ? 130 : size}
        outerCircleColor={accentColor}
        innerCircleColor={textAccentColor}
        middleCircleColor={detailColor}
      />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 7rem 5rem;
`;
