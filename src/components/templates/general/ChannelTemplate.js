import NavMenu from '../../molecules/general/NavMenu';
import Nav from '../../organisms/general/Nav';
import Header from '../../organisms/general/Header';
import Main from '../../organisms/general/Main';
import styled from 'styled-components';
import { useApiGet } from '../../../hooks/useApi';
import { useParams } from 'react-router-dom';
import useUserStore from '../../../stores/useUserStore';
import { useEffect, useState } from 'react';

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 16px;
  margin-right: 10px;
  display: inline-block;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  border: 1px solid #efefef;
`;

const CountInfo = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.47);
  margin-top: 30px;
`;

const ChannelTitle = styled.h2`
  margin-top: 4px;
  font-size: 40px;
`;

export default function ChannelTemplate(p) {
  const { chnlUri } = useParams();

  const [url, setUrl] = useState(`/channel/${encodeURIComponent(chnlUri)}`);
  const { data, isLoading, error } = useApiGet(
    url,
    [url]
  );
  useEffect(() => {
    setUrl(`/channel/${encodeURIComponent(chnlUri)}`);
  }, [chnlUri]);

  const { user } = useUserStore();
  if (isLoading) return;
  if (error) return <span>{`[${error.code}] ${error.message}`}</span>;

  if (!data) {
    return null;
  }

  const mainNavLinks = [
    {
      to: `/channel/${encodeURIComponent(chnlUri)}`,
      children: '홈',
      end: true,
    },
    {
      to: `/channel/${encodeURIComponent(chnlUri)}/webtoon`,
      children: '웹툰',
    },
    {
      to: `/channel/${encodeURIComponent(chnlUri)}/webnovel`,
      children: '웹소설',
    },
    {
      to: `/channel/${encodeURIComponent(chnlUri)}/about`,
      children: '소개',
    },
  ];

  return (
    <>
      <Header />
      <Nav>{p.nic}</Nav>
      <Main>
        <Thumbnail imageUrl={data.data.channel.chnlImgPath} />
        <CountInfo>
          구독자 {data.data.channel.suberCnt}명 · 포스트{' '}
          {data.data.channel.chnlPostCnt}개
        </CountInfo>
        <ChannelTitle>{data.data.channel.chnlTtl}</ChannelTitle>
        {/*
        // TODO: 구독하기 버튼 처리
        <div>
          구독하기 버튼
        </div> */}
        <Nav>
          <NavMenu navLinks={mainNavLinks} />
        </Nav>
        <Main>{p.children}</Main>
      </Main>
    </>
  );
}
