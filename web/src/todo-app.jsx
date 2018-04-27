import React from 'react';
import { ListDataContainer } from "./containers/list-data-container";
import { Title } from "./components/title";
import './style.css';


export const TodoApp = ({ name }) => {
  const appTitle = "Todos";
  return (
    <div className="todo-app">
      <Title title={appTitle} />
      <ListDataContainer />
    </div>
  );
};
