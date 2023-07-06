import ChannelTemplate from '../../../components/templates/general/ChannelTemplate';
import styled from 'styled-components';
import useUserStore from '../../../stores/useUserStore';
import { useParams } from 'react-router-dom';
import { useApiGet } from '../../../hooks/useApi';
import PostItem from '../../../components/organisms/general/PostItem';
import NoContent from '../../../components/molecules/error/NoContent';
import BtnLinkSC from '../../../components/atoms/Link/BtnLinkSC';
import CreateTemplate from '../../../components/templates/general/CreateTemplate';
import React, { useState } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextInputSC from '../../../components/atoms/Input/TextInputSC';
import ImageResize from 'quill-image-resize';
import PostRadioButton from '../../../components/molecules/post/PostRadioButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faUser } from '@fortawesome/free-solid-svg-icons';
import PostImg from '../../../components/atoms/Post/PostImgSC';

Quill.register('modules/imageResize', ImageResize);
export const SubmitButton = styled.button`
  display: block;
  width: fit-content;
  padding: 8px 30px;
  font-size: 15px;
  border-radius: 4px;
  font-weight: normal;
  color: white;
  background-color: #3478FF;
  border: 1px solid #3478FF;
`;



export default function PostCreate() {
  // const { user } = useUserStore();
  // const { chnlUri } = useParams();
  // const { data, isLoading, error } = useApiGet(
  //   `/channel/${encodeURIComponent(chnlUri)}`,
  //   [chnlUri]
  // );
  //
  // if (isLoading) return;
  // if (error) return <span>{`[${error.code}] ${error.message}`}</span>;
  //
  // if (!data) {
  //   return null;
  // }

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState(null);
  const [postType, setPostType] = useState('');
  // const modules = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline', 'strike'], // 텍스트 스타일
  //     [{ list: 'ordered' }, { list: 'bullet' }], // 리스트
  //     [{ indent: '-1' }, { indent: '+1' }], // 들여쓰기
  //     [{ align: [] }], // 정렬
  //     ['link', 'image'], // 링크, 이미지
  //     ['clean'], // 포맷 지우기
  //   ],
  // };

 const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // 새로운 글자 크기 조절 옵션
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{ 'align': [] }],  // 새로운 텍스트 정렬 옵션
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
   imageResize: {}
  }
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'align', 'list', 'bullet', 'indent',
      'link', 'image',
      'size'
    ]

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubTitleChange = (event) =>{
    setSubTitle(event.target.value);
  }

  const handleThumbnailImageUrlChange = (event) =>{
    setThumbnailImageUrl(event.target.value);
  };

  const handleOptionChange = (event) => {
    setPostType(event.target.value);
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // 선택한 postType 값과 기타 필요한 데이터를 API로 전송합니다.
    const postData = {
      postType: postType,
      postTtl: title,
      postSbTtl: subTitle,
      postContent: content,
      postThumnPath: thumbnailImageUrl,
    };

    // API 호출 등의 로직을 추가합니다.
    // 예: axios.post('/api/posts', postData)
    console.log('전송할 데이터:', postData);
  };

  const options = [
    { label: '웹툰', value: '웹툰' },
    { label: '웹소설', value: '웹소설' },

  ];


  return (
    <CreateTemplate>
      <div>
        <form onSubmit={handleFormSubmit}>
          <h3 style={{ marginBottom : '30px' }}>포스트 작성하기</h3>

          <p style={{ marginBottom : '10px' }}>포스트 타입</p>
          <PostRadioButton
            options={options}
            selectedOption={postType}
            handleOptionChange={handleOptionChange}
          />
          <div style={{ height: '20px' }}></div>

          <TextInputSC
            type="text"
            placeholder="제목"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleTitleChange}
          />

          <div style={{ margin: '20px'}}></div>

          <TextInputSC
            type="text"
            placeholder="부제목"
            value={subTitle}
            onChange={handleSubTitleChange}
            onKeyDown={handleSubTitleChange}
          />

          <div style={{ margin: '20px'}}></div>

          <div style={{ position: 'relative'}}>
            <PostImg>
            </PostImg>
            <label className="post-thumnImg-label" htmlFor="postThumnImg">썸네일 이미지 추가</label>
            <input
              className="post-thumnImg-input"
              type="file"
              accept="image/*"
              id="postThumImg"
            />
            <FontAwesomeIcon icon={faImage} style={{position: 'absolute', top: '12px', left: '5px'}}/>
            <TextInputSC
              style={{ paddingLeft: '24px'}}
              type="text"
              placeholder="썸네일 이미지 url"
              value={thumbnailImageUrl}
              onChange={handleThumbnailImageUrlChange}
              onKeyDown={handleThumbnailImageUrlChange}
            />
          </div>

          <div style={{ height: '500px', margin: '20px 0 50px 0' }}>
            <ReactQuill value={content} onChange={handleEditorChange} style={{ height: '500px' }} modules={modules} formats={formats}/>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SubmitButton type="submit">게시</SubmitButton>
          </div>
        </form>
      </div>
    </CreateTemplate>
  );
}
