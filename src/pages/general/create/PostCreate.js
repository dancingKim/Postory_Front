import ChannelTemplate from '../../../components/templates/general/ChannelTemplate';
import styled from 'styled-components';
import useUserStore from '../../../stores/useUserStore';
import { useParams } from 'react-router-dom';
import { useApiGet, useApiPost } from '../../../hooks/useApi';
import PostItem from '../../../components/organisms/general/PostItem';
import NoContent from '../../../components/molecules/error/NoContent';
import BtnLinkSC from '../../../components/atoms/Link/BtnLinkSC';
import CreateTemplate from '../../../components/templates/general/CreateTemplate';
import React, { useMemo, useRef, useState } from 'react';
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

export const PostImgInputSC = styled.input`
  display: inline-block;
  padding: 8px 30px;
  font-size: 15px;
  border-radius: 4px;
  font-weight: normal;
  color: white;
  background-color: #3478FF;
  border: 1px solid #3478FF;
  cursor: pointer;
  margin-left: 10px; // 이미지와 버튼 사이에 간격을 주기 위함
`;

export const ImageContainerSC = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
  const [postId, setPostId] = useState(null);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const quillRef = useRef();
  const imageData = new FormData();
  const {
    res: postRes,
    error: postErr,
    setError: setPostErr,
    postData: post,
  } = useApiPost(`post/create`, {
    postType: postType,
    postTtl: title,
    postSbTtl: subTitle,
    postContent: content,
    postThumnPath: thumbnailImageUrl,
  });

  const {
    res: uploadRes,
    error: uploadErr,
    setError: setUploadErr,
    postData: upload,
  } = useApiPost(`file/uploadFiles?postId=${postId}`, new FormData());

  const imageHandler = () => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
    //
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // // input이 클릭되면 파일 선택창이 나타난다.
    //
    // // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {
      console.log('온체인지');
      const files = input.files;
      // multer에 맞는 형식으로 데이터 만들어준다.
      Array.prototype.forEach.call(files, function(file) {
        formData.append('multipartFiles',file);
      });

      // 백엔드 라우터에 이미지를 보낸다.
      try {

        // const result = await axios.post('http://localhost:4050/img', formData);

        console.log('성공 시, 백엔드가 보내주는 데이터', uploadRes.data.url);
        //     // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
        //     // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
        //     // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.
        //
        //     // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
        //     // 1. 에디터 root의 innerHTML을 수정해주기
        //     // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
        //     // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
        uploadRes.data.data.urls.forEach((IMG_URL) => {
            editor.root.innerHTML =
              editor.root.innerHTML + `<img src=${process.env.PUBLIC_URL+IMG_URL} '/><br/>`;
            // 현재 있는 내용들 뒤에 써줘야한다.
            //
            //     // 2. 현재 에디터 커서 위치값을 가져온다
            const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', IMG_URL);
            //     // 가져온 위치에 이미지를 삽입한다
          }
        )
      } catch (error) {
        console.log('실패했어요ㅠ');
      }
    });
  };

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if(imgRef.current.files.length > 0) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
        console.log(imgFile);
      };
    } else {
      console.warn('No file selected');
    }
  };

  // 업로드 된 이미지 미리보기
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

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ 'header': [1, 2, false] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  // 새로운 글자 크기 조절 옵션
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'align': [] }],  // 새로운 텍스트 정렬 옵션
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
        ],
        handlers: {
          image: imageHandler,
        },
        imageResize: {}
      },
    }
  },[]);

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

    console.log('전송할 데이터:', postData);
    post(postData);

    setPostId(postRes.data.data.postId);
    upload(imageData);
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
          <ImageContainerSC>
            <PostImg src={imgFile} onClick={() => imgRef.current.click()} />
            <PostImgInputSC
              type={"file"}
              accept={"image/*"}
              onChange={saveImgFile}
              ref={imgRef}
              style={{ display: 'none' }}  // input 요소를 숨김
            />
            <p style={{ marginLeft: '20px', marginBottom : '10px', fontSize : '16px', fontWeight : 'bold'  }}>썸네일을 선택해 주세요!</p>
          </ImageContainerSC>

          <div style={{ height: '20px' }}></div>
          <p style={{ marginBottom : '10px', fontSize : '16px', fontWeight : 'bold'  }}>포스트 타입</p>
          <PostRadioButton
            options={options}
            selectedOption={postType}
            handleOptionChange={handleOptionChange}
          />

          <div style={{ margin: '20px'}}></div>
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

          <div style={{ position: 'relative'}}>

            {/*  <FontAwesomeIcon icon={faImage} style={{position: 'absolute', top: '12px', left: '5px'}}/>*/}
            {/*  <TextInputSC*/}
            {/*    style={{ paddingLeft: '24px'}}*/}
            {/*    type="text"*/}
            {/*    placeholder="썸네일 이미지 url"*/}
            {/*    value={thumbnailImageUrl}*/}
            {/*    onChange={handleThumbnailImageUrlChange}*/}
            {/*    onKeyDown={handleThumbnailImageUrlChange}*/}
            {/*  />*/}
          </div>

          <div style={{ height: '500px', margin: '20px 0 50px 0' }}>
            <ReactQuill ref={quillRef} value={content} onChange={handleEditorChange} style={{ height: '500px' }} modules={modules} formats={formats}/>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SubmitButton type="submit">게시</SubmitButton>
          </div>
        </form>
      </div>
    </CreateTemplate>
  );
}
