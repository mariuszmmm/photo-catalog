import { RotatingLines } from 'react-loader-spinner';
import { Wrapper } from './styled';

export const Loader = ({ loading }) => {
  return (
    <Wrapper>
      <RotatingLines
        visible={loading}
        width="30"
        strokeColor="black"
      />
    </Wrapper>
  );
};