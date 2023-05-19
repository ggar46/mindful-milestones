import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import MyNavBar from './components/Navbar';
import CardGoal from './components/goal_components/CardGoal';
import TasksForm from './components/task_components/TasksForm';
import CardImage from './components/image_components/CardImage';
import Goals from './components/goal_components/Goals';
// import ListGoalCards from './components/goal_components/ListGoalCards';
import FormGoal from './components/goal_components/FormGoal';

test('Navbar renders correctly', () => {
  const { getByTestId } = render(<MyNavBar />);
  //navbar is id in tag
  const navbarElement = getByTestId('navbar');
  expect(navbarElement).toBeDefined();
});

test('Task content renders correctly', () => {
  const { getByTestId } = render(<TasksForm />);
  const taskElement = getByTestId('taskModal');
  expect(taskElement).toBeDefined();
});

//could not test listCards because of API call

// test('Task content renders correctly', () => {
//   const { getByTestId } = render(<Goals />);
//   const taskElement = getByTestId('taskModal');
//   expect(taskElement).toBeDefined();
// });

test('Task content renders correctly', () => {
  const { getByTestId } = render(<CardGoal />);
  const taskElement = getByTestId('taskModal');
  expect(taskElement).toBeDefined();
});

test('Task content renders correctly', () => {
  const { getByTestId } = render(<CardImage />);
  const taskElement = getByTestId('taskModal');
  expect(taskElement).toBeDefined();
});





