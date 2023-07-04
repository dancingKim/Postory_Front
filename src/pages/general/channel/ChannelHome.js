import ChannelTemplate from '../../../components/templates/general/ChannelTemplate';
import channelData from '../../../tempData/channel/channel.json';
import styled from 'styled-components';
import useUserStore from '../../../stores/useUserStore';
import { useParams } from 'react-router-dom';
import { useApiGet } from '../../../hooks/useApi';

const SectionHeader = styled.div`
  padding: 0 0 10px;
  color: #121212;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid rgba(0,0,0,.05);
  display: flex;
  justify-content: space-between;
`;

// const PostListContainer = styled.div`

// `;

// const PostListItem = styled.div`
//   display: flex;
//   margin: 10px;
//   background-color: #ffffff;
//   padding: 10px;
//   justify-content: space-between;
//   border-bottom: 1px solid rgba(0,0,0,.05);
//   font-weightL 500;
// `;

// const Thumbnail = styled.div`
//   width: 144px;
//   height: 108px;
//   background-color: #ffffff;
//   border-radius: 8px;
//   margin-right: 10px;
//   display: inline-block;
//   background-image: url(${props => props.imageUrl});
//   background-size: cover;
// `;

const WebtoonListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WebtoonListItem = styled.div`
  width: calc(33.33% - 10px); /* 33.33% width minus margin */
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  font-weight: 500;
`;

const WebtoonThumbnail = styled.div`
  width: 100%;
  height: 250px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-right: 10px;
  display: inline-block;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  border: 1px solid rgba(0,0,0,.05);
`;

const WebtoonSeriesTitle = styled.p`
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 4px;
  color: rgba(0,0,0,.54);
`;

const WebtoonTitle = styled.h3`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 6px;
`;

const WebtoonSubInfo = styled.div`
  display: flex;
`;

const WebtoonWriter = styled.span`
  color: #000;
  font-size: 12px;
`;

const WebtoonCount = styled.span`
  margin-left: 8px;
  color: rgba(0,0,0,.47);
  font-size: 12px;
  
`;

const WebtoonViewCountIcon = styled.img`
  vertical-align: top;
  margin-right: 2px;
`

export default function ChannelHome() {
  const { user } = useUserStore();
  const { chnlUri } = useParams();
  const { data, isLoading, error } = useApiGet(
    `/channel/${encodeURIComponent(chnlUri)}`,
    [chnlUri]
  );

  if (isLoading) return;
  if (error) return <span>{`[${error.code}] ${error.message}`}</span>;

  if (!data) {
    return null;
  }


  return (
    <ChannelTemplate>
      <SectionHeader>
        <span>포스트</span>
        <span>{">"}</span>
      </SectionHeader>
      {/* <PostListContainer style={{ padding: '50px', margin: '20px 0' }}>
        {data.data.channelPosts.map((post, index) => (
          <PostListItem key={index}>
            <div>
              <h3>{post.postTtl}</h3>
              <p>포스트 내용이 들어갈 예정입니다.포스트 내용이 들어갈 예정입니다.포스트 내용이 들어갈 예정입니다.</p>
            </div>
            <Thumbnail imageUrl={post.postThumnPath} />
          </PostListItem>
        ))}
      </PostListContainer> */}
      <WebtoonListContainer style={{ padding: '50px', margin: '20px 0' }}>
        {data.data.channelPosts.map((post, index) => (
          <WebtoonListItem key={index}>
            <WebtoonThumbnail imageUrl={post.postThumnPath} />
            <div>
              { post.serTtl != null ? <WebtoonSeriesTitle>{post.serTtl}</WebtoonSeriesTitle> : null}
              <WebtoonTitle>{post.postTtl}</WebtoonTitle>
            </div>
            <WebtoonSubInfo>
              <WebtoonWriter>{data.data.channelUser.nic}</WebtoonWriter>
              <WebtoonCount>
                <WebtoonViewCountIcon src="https://d33pksfia2a94m.cloudfront.net/assets/img/icon/ic_eye_black.svg"  width={13} height={16}/>
                {post.postInqrCnt}
              </WebtoonCount>
              <WebtoonCount>
                {/* <WebtoonViewCountIcon src="https://d33pksfia2a94m.cloudfront.net/assets/img/icon/ic_eye_black.svg"  width={13} height={16}/> */}
                ♡
                {post.postLikCnt}
              </WebtoonCount>
               <WebtoonCount>
                21시간 전 
              </WebtoonCount>


            </WebtoonSubInfo>
          </WebtoonListItem>
        ))}
      </WebtoonListContainer>


      <SectionHeader>
        <span>시리즈</span>
        <span>{">"}</span>
      </SectionHeader>
      시리즈 준비중..
      {/* <ul style={{ padding: '50px', margin: '20px 0' }}>
        {data.data.channelSerieses.map((series, index) => (
          <li key={index}>
            <h3>{series.serTtl}</h3>
            <img src={series.serThumnPath} width={50} height={50} />
          </li>
        ))}
      </ul> */}
    </ChannelTemplate>

  );
}
