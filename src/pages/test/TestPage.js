import styled from "styled-components";
import { useApiFormPut, useApiGet } from '../../hooks/useApi';

const Page = styled.div`

`

const TestPage = () => {
  const {
    isLoading,
    data,
    error,
  } = useApiGet('/test/user/all');
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

export default TestPage