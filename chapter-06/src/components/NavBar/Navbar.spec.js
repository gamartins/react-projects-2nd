import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from './NavBar';

test('Navbar component should render', () => {
  const view = render(<NavBar/>);

  expect(view).toMatchSnapshot();
});

test('Navbar component should render with title', () => {
  const title = 'Test application';
  
  render(<NavBar title={title} />);

  expect(screen.getByRole('heading')).toHaveTextContent(title);
});

test('Navbar componet should respond to button clicks', () => {
  const mockFunction = jest.fn();

  render(<NavBar goBack={mockFunction} openForm={mockFunction}/>);

  fireEvent.click(screen.getByText('< Go Back'));
  fireEvent.click(screen.getByText('+ Add Review'));

  expect(mockFunction).toHaveBeenCalledTimes(2);
})
