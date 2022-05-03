import React, { useState } from 'react';
import { View, StatusBar, FlatList } from 'react-native';
import styled from 'styled-components';
import AddInput from './AddInput'
import TodoList from './TodoList';
import Header from './Header';

export default function App() {
    const [data, setData] = useState([]);

    const deleteItem = (key) => {
        setData((prevTodo) => {
          return prevTodo.filter((todo) => todo.key != key);
        });
      };

    const submitHandler = (value) =>{
        setData((prevTodo) => {
            return [
            {
                value: value,
                key: Math.random().toString(),
            },
            ...prevTodo,
        ];
        });
    };

    return (
        <ComponentContainer>
            <View>
                <StatusBar barStyle="light-content" backgroundColor="midnightblue">
                </StatusBar>
            </View>

            <View>
            <FlatList
            data={data}
            ListHeaderComponent={() => <Header />}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem} />
            )}
          />
                <View>
                    <AddInput submitHandler={submitHandler} />
                </View>
            </View>
        </ComponentContainer>
    );
}

const ComponentContainer = styled.View`
  background-color: #040406;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;