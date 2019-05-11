import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TodoList from '../src/ui/TodoList';


storiesOf('TodoList', module)
  .add('empty list', () => <TodoList />)
  .add('with single item', () => <TodoList todos={[ { title: 'test', description: 'test' } ]} />)
  .add('with two items', () => <TodoList todos={[ { title: 'test', description: 'test' }, { title: 'test', description: 'test' } ]} />);
