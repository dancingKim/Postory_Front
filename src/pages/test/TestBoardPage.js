import styled from "styled-components";
import { useApiFormPut, useApiGet } from '../../hooks/useApi';

const Page = styled.div`

`

const TestBoardPage = () => {
  const {
    isLoading,
    data,
    error,
  } = useApiGet('/board/');
  if (isLoading) return;
  if (error) return <span>{`[${error.code}] ${error.message}`}</span>;

  if (!data) {
    return null;
  }
  console.dir(data);

  return(
    <Page>
    </Page>
  );
};

export default TestBoardPage