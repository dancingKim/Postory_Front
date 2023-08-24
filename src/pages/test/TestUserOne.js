import styled from "styled-components";
import { useApiGet } from '../../hooks/useApi';

const Page = styled.div`

`

const TestUserOne = () => {
  const {
    isLoading,
    data,
    error,
  } = useApiGet('/test/user/one');
  if (isLoading) return;
  if (error) return <span>{`[${error.code}] ${error.message}`}</span>;

  if (!data) {
    return null;
  }
  console.dir(data);
    return(
    <Page>
      Welcome!
    </Page>
    );
};

export default TestUserOne