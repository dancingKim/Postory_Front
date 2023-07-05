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

Quill.register('modules/imageResize', ImageResize);

export const SubmitButton = styled.button`
  display: block;
  width: fit-content;
  padding: 7px 15px;
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

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // 여기에서 포스트를 작성하거나 전송하는 로직을 추가할 수 있습니다
    console.log('제목:', title);
    console.log('부제목', subTitle);
    console.log('내용:', content);
  };


  return (
    <CreateTemplate>
      <div>
        <form onSubmit={handleFormSubmit}>
          {/*<input*/}
          {/*  type="text"*/}
          {/*  id="title"*/}
          {/*  value={title}*/}
          {/*  onChange={handleTitleChange}*/}
          {/*/>*/}

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

          <div style={{ height: '500px', margin: '50px 0' }}>
            <ReactQuill value={content} onChange={handleEditorChange} style={{ height: '500px' }} modules={modules} formats={formats}/>
          </div>

          <SubmitButton type="submit">게시</SubmitButton>
        </form>
      </div>
    </CreateTemplate>
  );
}
