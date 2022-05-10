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
  const [storedData, setStoredData] = useState([]);
  const toggleSwitch = () => SetToggle(previousState => !previousState);

  useEffect(() => {
    storeNewData(data)
  }, [data])
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@todo:tasks');
       setStoredData(JSON.parse(jsonValue));
    } catch(e) {}
  }

    const deleteItem = (key) => {
        setData((prevTodo) => {
          return prevTodo.filter((todo) => todo.key != key);
          
        });
      };

    const submitHandler = (value) => {
        setData((prevTodo) => {
            return [
            {
                value: value,
                key: Math.random().toString(),
            },
            ...prevTodo,
        ];
        })
    };

    const storeNewData = async (newData) => {
      try {
        await AsyncStorage.setItem(
          '@todo:tasks',
          JSON.stringify(newData)
        );
      } catch (error) {
        
      }
      getData()
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
            data={storedData}
            ListHeaderComponent={() => <Header toggle={toggle}/>}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TodoList item={item} deleteItem={deleteItem} />
            )}
          />
                <View>
                <Text>{}</Text>
                    <AddInput submitHandler={submitHandler}/>
                </View>
            </View>
        </ComponentContainer>
    );
}