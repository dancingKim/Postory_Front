import NavMenu from '../../molecules/general/NavMenu';
import Nav from '../../organisms/general/Nav';
import Header from '../../organisms/general/Header';
import Main from '../../organisms/general/Main';
import styled from 'styled-components';
import { useApiGet } from '../../../hooks/useApi';
import { useParams } from 'react-router-dom';
import useUserStore from '../../../stores/useUserStore';
import { useEffect, useState } from 'react';

export default function CreateTemplate(p) {
  // const { chnlUri } = useParams();
  //
  // const [url, setUrl] = useState(`/channel/${encodeURIComponent(chnlUri)}`);
  // const { data, isLoading, error } = useApiGet(
  //   url,
  //   [url]
  // );
  // useEffect(() => {
  //   setUrl(`/channel/${encodeURIComponent(chnlUri)}`);
  // }, [chnlUri]);
  //
  // const { user } = useUserStore();
  // if (isLoading) return;
  // if (error) return <span>{`[${error.code}] ${error.message}`}</span>;
  //
  // if (!data) {
  //   return null;
  // }

  return (
    <>
      <Header />
      <Nav>{p.nic}</Nav>
      <Main>{p.children}</Main>
    </>
  );
}
