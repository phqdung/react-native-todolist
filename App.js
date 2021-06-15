import React, { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

const makeId = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const FORM_STATE = {
  ADD: "add",
  EDIT: "edit"
}

const TodoItem = (props) => {
  const { todo, onEdit, onTodoDone } = props;
  return (
    <View>
      <Text>{todo.task}</Text>
      {todo.isDone && <Text>(Done)</Text>}
      {!todo.isDone && <Button title="Check Done" onPress={onTodoDone(todo)}></Button>}
      <Button title="Edit" onPress={onEdit(todo)}></Button>
    </View>
  );
}

const App = () => {
  const [todoList, setTodoList] = useState([]);

  //form
  const [formState, setFormState] = useState(FORM_STATE.ADD);
  const [value, setValue] = useState("");
  const [todoEdit, setTodoEdit] = useState(null);

  const handleSubmitForm = () => {
    const newTodoList = [...todoList];

    if (formState === FORM_STATE.ADD) {
      newTodoList.push({ id: makeId(5), task: value, isDone: false });
    } else {
      const foundIndex = todoList.findIndex((todo) => todoEdit && todo.id === todoEdit.id);
      if (foundIndex >= 0) {
        newTodoList[foundIndex].task = value;
      }
    }

    setFormState(FORM_STATE.ADD);
    setTodoList(newTodoList);
    setValue("");
  }

  const handleEditTodo = (todo) => () => {
    setFormState(FORM_STATE.EDIT);
    setTodoEdit(todo);
    setValue(todo.task);
  }

  const handleDoneTodo = (todo) => () => {
    const foundIndex = todoList.findIndex((todoItem) => todoItem.id === todo.id);
    if (foundIndex >= 0) {
      const newTodoList = [...todoList];
      newTodoList[foundIndex].isDone = true;
      setTodoList(newTodoList);
    }
  }

  const renderItem = ({ item }) => <TodoItem todo={item} onEdit={handleEditTodo} onTodoDone={handleDoneTodo} />

  return (
    <View>
      <TextInput placeholder="Input your todo..." value={value} onChangeText={(newValue) => setValue(newValue)} ></TextInput>
      <Button title={formState == FORM_STATE.EDIT ? "Save" : "Add"} onPress={handleSubmitForm} />
      <Text>Todo List</Text>
      <FlatList data={todoList} keyExtractor={item => item.id} renderItem={renderItem}></FlatList>
    </View>
  );
}

export default App;