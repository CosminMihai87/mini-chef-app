import { render } from '@testing-library/react';
import App from '../../src/App';

test('renders <App />', () => {
  const { container, getByText } = render(<App />);
  expect(getByText(/mini-chef-app/i)).toBeInTheDocument();
  expect(container.firstChild).toBeTruthy();
});