import styled from 'styled-components';
import ChannelTemplate from '../../../components/templates/general/ChannelTemplate';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import useUserStore from '../../../stores/useUserStore';
import { useLocation, useParams } from 'react-router-dom';
import { useApiGet } from '../../../hooks/useApi';
import PostItem from '../../../components/organisms/general/PostItem';
import NoContent from '../../../components/molecules/error/NoContent';
import BtnLinkSC from '../../../components/atoms/Link/BtnLinkSC';

const SectionHeader = styled.div`
  padding: 0 0 10px;
  color: #121212;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid rgba(0,0,0,.05);
  display: flex;
  justify-content: space-between;
`;

const SectionHeaderFilter = styled.div`
  color: rgba(0,0,0,.47);
  font-size: 14px;
  font-weight: 500;
`;

// Pagination style
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.div`
  min-width: 30px;
  height: 30px;
  padding: 4px;
  margin: 0 2px;
  font-weight: 500;
  font-size: 14px;
  //width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border:  ${({ isSelected }) => (isSelected ? '1px solid #ccc' : '')}; 
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
`;

export default function ChannelWebnovel() {
  const { user } = useUserStore();
  const { chnlUri } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageString = queryParams.get('page');  // This will be a string
  const page = pageString !== null ? Number(pageString) - 1 : 0;
  const [currentPage, setCurrentPage] = useState(page);
  const postType = "webnovel";
  const [url, setUrl] = useState(`/channel/${encodeURIComponent(chnlUri)}/posts/${postType}?page=${currentPage+1}`
  );
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(null);
  const { data, isLoading, error } = useApiGet(
    url,
    [url]
  );

  const size = 12;

  useEffect(() => {
    if (data) {
      setTotalCount(data.data.channel.chnlWebnovelCnt || 0);
    }
  }, [data]);

  useEffect(() => {
    const calculatePageCount = () => {
      setPageCount(Math.ceil(totalCount / size));
    };

    calculatePageCount();
  }, [totalCount, size]);

  useEffect(() => {
    setUrl(`/channel/${encodeURIComponent(chnlUri)}/posts/${postType}?page=${currentPage+1}`);
  }, [currentPage, chnlUri]);


  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) return<div>Loading...</div>;
  if (error) return <span>{`[${error.code}] ${error.message}`}</span>;

  if (!data) {
    return null;
  }




  return (
    <ChannelTemplate>
      <SectionHeader>
        <span>{data.data.channel.chnlWebnovelCnt}개의 포스트</span>
        <SectionHeaderFilter>최신순 | 인기순</SectionHeaderFilter>
      </SectionHeader>
      {data.data.webnovels.length !== 0 ? (
        data.data.webnovels.map((post) => <PostItem key={post.postId} post={post} />)
      ) : (
        <>
          <NoContent>
            아직 발행한 포스트가 없습니다.
            {data.data.channelUser.eid === user.eid && (
              <BtnLinkSC to="/post/create">포스트 발행하기</BtnLinkSC>
            )}
          </NoContent>
        </>
      )}

      <PaginationContainer>
        <PaginationButton onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </PaginationButton>
        {Array.from({ length: pageCount }).map((_, index) => (
          <PaginationButton
            key={index}
            isSelected={index === currentPage}
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </PaginationButton>
        ))}
        <PaginationButton onClick={handleNextPage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </PaginationButton>
      </PaginationContainer>
    </ChannelTemplate>
  );
}
