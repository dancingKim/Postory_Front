import React, { useState } from 'react';
import styled from 'styled-components';

const RadioButtonContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const RadioButtonLabel = styled.label`
  display: inline-block;
  background-color: ${({ checked }) => (checked ? '#3478FF' : '#fff')};
  color: ${({ checked }) => (checked ? '#fff' : 'rgba(0, 0, 0, 0.3)')};
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 8px 30px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #3478FF;
    color: #fff;
  }
`;

const RadioButtonInput = styled.input`
  display: none;
`
const PostRadioButton = ({ options, selectedOption, handleOptionChange }) => {
  // const [selectedOption, setSelectedOption] = useState('');

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <RadioButtonContainer>
      {options.map((option) => (
        <RadioButtonLabel
          key={option.value}
          checked={selectedOption === option.value}
        >
          <RadioButtonInput
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
          />
          {option.label}
        </RadioButtonLabel>
      ))}
    </RadioButtonContainer>
  );
};

export default PostRadioButton;
