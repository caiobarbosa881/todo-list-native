import React, { useState, useEffect } from 'react';
import { View, StatusBar, FlatList, StyleSheet } from 'react-native';
import styled from 'styled-components';
import AddInput from './AddInput'
import TodoList from './TodoList';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export default function App() {
  const [listData, setListData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [storedToggle, setStoredToggle] = useState(false);
  const [storedData, setStoredData] = useState([]);
  const toggleThemeSwitch = () => setToggle(!toggle);

  useEffect(() => {
    storeNewData(listData)
  }, [listData])

  useEffect(() => {
    storeThemeData(toggle)
  }, [toggle])

  const storeThemeData = async (newThemeData) => {
    try{
      await AsyncStorage.setItem(
        '@theme:toggleValue',
        JSON.stringify(toggle)
      );
      await getThemeData();
    } catch(error) {}
  }

  const getThemeData = async () => {
    try {
      const themeValue = await AsyncStorage.getItem('@theme:toggleValue');
      setStoredToggle(JSON.parse(themeValue));
    } catch(e) {}
  }

  const deleteItem = (key) => {
    setListData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (value) => {
    setListData((prevTodo) => {
      return [
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    })
  };

  const getStoredData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@todo:tasks');
      setStoredData(JSON.parse(jsonValue));
    } catch (e) { }
  }

  const storeNewData = async (newData) => {
    try {
      await AsyncStorage.setItem(
        '@todo:tasks',
        JSON.stringify(newData)
      );
      await getStoredData()
    } catch (error) {}
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
    <View>
      <StatusBar backgroundColor="#3F48CC" />
      <ComponentContainer>
        <View>
          {storedToggle ? <Icon style={style.icon} name="sun" size={28} /> : <Icon style={style.icon} name="sun" size={28} color={'#fff'} />}
          <ThemeSwitch
            trackColor={{ false: "#919091", true: "#504f50" }}
            thumbColor="white"
            onValueChange={toggleThemeSwitch}
            value={storedToggle}
          />
          <FlatList
            data={storedData}
            ListHeaderComponent={() => <Header toggle={toggle} />}
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
    </View>
  );
}

const style = StyleSheet.create({
  icon: {
    marginTop: 10,
    position: 'absolute',
    right: 50,
  }
})