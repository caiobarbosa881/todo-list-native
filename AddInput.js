import React, { useState} from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import styled from "styled-components";



const ComponentContainer = styled.View`
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

export default function AddInput({ submitHandler }) {
  const [value, setValue] = useState("");

  const onChangeText = (text) => {
    setValue(text);
  }
  
  return (
    <ComponentContainer>
      <InputContainer>
        <Input placeholder="Adicionar Tarefa..." onChangeText={onChangeText} />
      </InputContainer>
      <SubmitButton 
        onPress={() => {
          submitHandler(value)
      }}>
        <Text>Enviar</Text>
      </SubmitButton>
    </ComponentContainer>
  );
}

const Input = styled.TextInput`
font-size: 20px;
background-color: grey;
width: 300px;
margin-right: 20px;
padding: 10px;
margin-bottom: 20px;
border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: grey;
  border-radius: 50px;
`;