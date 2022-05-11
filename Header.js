import React from "react";
import styled from "styled-components";

let today = new Date().toISOString().slice(0, 10);
let dia = [today.slice(8, 10)]
let mes = [today.slice(5, 7)]
let ano = [today.slice(0, 4)]
let dataDeHoje = `${dia}/${mes}/${ano}`

export default function Header({ toggle }) {
  const HeaderText = styled.Text`
  font-size: 30px;
  color: ${toggle ? 'black' : 'white'};
  `;

  const HeaderList = styled.Text`
  color: ${toggle ? 'black' : 'white'};
  font-size: 20px;
  margin-right: 20px;
  `;

  return (
    <ComponentContainer>
      <HeaderText>Lista de Tarefas</HeaderText>

      <HeaderList>{dataDeHoje}</HeaderList>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;