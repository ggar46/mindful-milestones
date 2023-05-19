import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import MyNavBar from './components/Navbar';
import CardGoal from './components/goal_components/CardGoal';
import TasksForm from './components/task_components/TasksForm';
import CardImage from './components/image_components/CardImage';
import Home from './components/Home';

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

test('CardGoal renders correctly', () => {
  const { getByTestId } = render(<CardGoal />);
  const taskElement = getByTestId('taskModal');
  expect(taskElement).toBeDefined();
});

test('CardImage renders correctly', () => {
  const { getByTestId } = render(<CardImage />);
  const taskElement = getByTestId('taskModal');
  expect(taskElement).toBeDefined();
});

test('Home renders correctly', () => {
  const { getByTestId } = render(<Home />);
  const taskElement = getByTestId('taskModal');
  expect(taskElement).toBeDefined();
});






