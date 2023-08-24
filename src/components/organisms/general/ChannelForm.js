import styled from 'styled-components';
import useForm from '../auth/useForm';
import ProfileTextInput from '../../molecules/user/ProfileTextInput';
import ProfileTextArea from '../../molecules/user/ProfileTextArea';
import ProfileImgInput from '../../molecules/user/ProfileImgInput';
import ConfirmBtnSC from '../../atoms/Button/ConfirmBtnSC';
import { useApiFormPut, useApiGet } from '../../../hooks/useApi';
import { useState } from 'react';
import AlertBox from '../../molecules/modal/AlertBox';
import { useEffect } from 'react';

const ProfileFormSC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 50px;
  margin-top: 30px;
`;

export default function ProfileForm() {
  const {
    isLoading,
    data,
    error: dataError,
  } = useApiGet('/account/settings/profile');
  const { isUpdating, putData, error, res, setRes, setError } = useApiFormPut(
    '/account/settings/profile'
  );
  const [file, setFile] = useState(null);
  const { form, setForm, handleChange } = useForm({
    userImgPath: '',
    nic: '',
    userIntro: '',
  });
  const [invalidMsg, setInvalidMsg] = useState('');

  useEffect(() => {
    if (data) {
      const formInitialState = {
        userImgPath: data.userImgPath,
        nic: data.nic,
        userIntro: data.userIntro,
      };
      setForm(formInitialState);
    }
  }, [data]);

  const validate = () => {
    if (form.nic === '') {
      return '닉네임을 입력하세요.';
    }
    return '';
  };

  const handleSubmit = () => {
    const validResult = validate();
    if (validResult) {
      setInvalidMsg(validResult);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nic', form.nic);
    formData.append('userIntro', form.userIntro);
    putData(formData);
  };

  const handleClose = () => {
    setRes(null);
    setError(null);
    setInvalidMsg('');
  };

  if (isLoading) return;
  if (error) return <span>{`[${error.code}] ${error.message}`}</span>;

  return (
    data && (
      <ProfileFormSC>
        <ProfileImgInput onFileChange={setFile} onInvalidMsg={setInvalidMsg} />
        <ProfileTextInput
          label="닉네임"
          isRequired={true}
          input={{
            name: 'nic',
            type: 'text',
            placeholder: '닉네임',
            value: form.nic,
            required: true,
            onChange: handleChange,
          }}
          msg="1자 이상 40자 이내로 입력해주세요."
        />
        <ProfileTextArea
          label="자기소개"
          textarea={{
            name: 'userIntro',
            placeholder: '자기소개',
            value: form.userIntro,
            rows: '4',
            onChange: handleChange,
          }}
          msg="최대 255자 가능"
        />
        <ConfirmBtnSC onClick={handleSubmit} disabled={isUpdating}>
          변경 내용 저장
        </ConfirmBtnSC>
        {res && (
          <AlertBox
            title="알림"
            btnName="확인"
            close={handleClose}
            message="프로필 정보를 수정하였습니다."
          />
        )}
        {invalidMsg && (
          <AlertBox
            title="알림"
            btnName="확인"
            close={handleClose}
            message={invalidMsg}
          />
        )}
        {error && (
          <AlertBox
            title="알림"
            btnName="확인"
            close={handleClose}
            message={error && error.errMsg}
          />
        )}
      </ProfileFormSC>
    )
  );
}
