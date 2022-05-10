import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList, Text } from 'react-native';
import styled from 'styled-components';
import AddInput from './AddInput'
import TodoList from './TodoList';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [data, setData] = useState([]);
  const [toggle, SetToggle] = useState(false);
  const toggleSwitch = () => SetToggle(previousState => !previousState);
  const [ola, setOla] = useState([]);

  const storeNewData = async () => {
    try {
      await AsyncStorage.setItem(
        '@todo:tasks',
        JSON.stringify(data)
      );
    } catch (error) {
      
    }
  };
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@todo:tasks');
       setOla(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch(e) {}
  }

    const deleteItem = (key) => {
        setData((prevTodo) => {
          return prevTodo.filter((todo) => todo.key != key);
          
        });
      };

    const submitHandler = async (value) => {
      try {
        setData((prevTodo) => {
            return [
            {
                value: value,
                key: Math.random().toString(),
            },
            ...prevTodo,
        ];
        })
      } catch {}
    };

    const ComponentContainer = styled.View`
    background-color: ${toggle ? 'white' : 'black'};
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

    const ThemeSwitch = styled.Switch`
    `;

    return (
        <ComponentContainer>
            <View>
                <StatusBar barStyle="light-content" backgroundColor="midnightblue">
                </StatusBar>
            </View>
            <View>
            <ThemeSwitch
        trackColor={{ false: "#919091", true: "#504f50" }}
        thumbColor="white"
        onValueChange={toggleSwitch}
        value={toggle}
      />
            <FlatList
            data={ola}
            ListHeaderComponent={() => <Header toggle={toggle}/>}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem} />
            )}
          />
                <View>
                <Text>{}</Text>
                    <AddInput submitHandler={submitHandler} storeNewData={storeNewData} getData={getData}/>
                </View>
            </View>
        </ComponentContainer>
    );
}