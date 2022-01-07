import React from 'react';
import {Button} from '@ant-design/react-native';
import styled, {css} from 'styled-components/native';

const ExamStyledComponent = () => {
  const [text, onChangeText1] = React.useState('');

  return (
    <>
      <StyledText length={text.length}>StyledView Components</StyledText>
      <StyledButton type="primary"> test Button </StyledButton>
      <StyledTextInput onChangeText={onChangeText1} value={text} />
      <StyledTextInput inputColor="blue" bold />
    </>
  );
};

interface StyledTextProps {
  readonly length?: number;
}
const StyledText = styled.Text<StyledTextProps>`
  padding: 50px;
  background-color: yellow;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin: 30px;
  background-color: blue;
`;
interface StyledTextInputProps {
  readonly inputColor?: string;
  readonly bold?: boolean;
}
const StyledTextInput = styled.TextInput<StyledTextInputProps>`
  padding: 20px;
  margin: 10px;
  color: ${props => props.inputColor || 'palevioletred'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ${props =>
    props.bold &&
    css`
      // props 를 쓰지 않는다면 사실 굳이 css 로 감쌀 필요는 없음
      background: #523123;
      border: solid 2px;
    `}
`;

export default ExamStyledComponent;
