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
  const { todo, onEdit, onTodoDone, onDelete } = props;
  return (
    <View>
      <Text>{todo.task}</Text>
      {todo.isDone && <Text>(Done)</Text>}
      {!todo.isDone && <Button title="Check Done" onPress={onTodoDone}></Button>}
      <Button title="Edit" onPress={onEdit}></Button>
      <Button title="Delete" onPress={onDelete}></Button>
    </View>
  );
}

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [filterTodoList, setFilterTodoList] = useState(null);

  //form
  const [formState, setFormState] = useState(FORM_STATE.ADD);
  const [value, setValue] = useState("");
  const [todoEdit, setTodoEdit] = useState(null);

  const handleAddSubmit = () => {
    const newTodoList = [...todoList, { id: makeId(5), task: value, isDone: false }];
    setTodoList(newTodoList);
    setValue("");
  }

  const handleEditSubmit = () => {
    const newTodoList = todoList.map((todo) => {
      if (todoEdit && todo.id === todoEdit.id) todo.task = value;
      return todo;
    })

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
    const newTodoList = todoList.map((todoItem) => {
      if (todoItem.id === todo.id) todoItem.isDone = true;
      return todoItem;
    });
    setTodoList(newTodoList);
  }

  const handleDeleteTodo = (todoId) => () => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newTodoList);
  }

  const renderItem = ({ item }) => {
    return <TodoItem todo={item}
      onEdit={handleEditTodo(item)}
      onTodoDone={handleDoneTodo(item)}
      onDelete={handleDeleteTodo(item.id)} />
  }

  const handleFilter = () => {
    if (!isFilter) {
      setFilterTodoList(todoList.filter((todo) => todo.isDone));
    }
    setIsFilter(!isFilter);
  }

  return (
    <View>
      <TextInput placeholder="Input your todo..." value={value} onChangeText={(newValue) => setValue(newValue)} ></TextInput>
      <Button title={formState == FORM_STATE.EDIT ? "Save" : "Add"} onPress={formState == FORM_STATE.EDIT ? handleEditSubmit : handleAddSubmit} />
      <Text>Todo List</Text>
      <Button title={isFilter ? "View All" : "Filter Todo Done"} onPress={handleFilter}></Button>
      <Text>-------------------</Text>
      <FlatList data={isFilter ? filterTodoList : todoList} keyExtractor={item => item.id} renderItem={renderItem}></FlatList>
    </View>
  );
}

export default App;