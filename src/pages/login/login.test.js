import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '~/redux/store';
import Login from './Login';

describe('register form test', () => {
  it('check default form value', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signin']}>
          <Login />
        </MemoryRouter>
      </Provider>,
    );
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toHaveFormValues({
      username: '',
      password: '',
    });
  });

  it('input wrong input length', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signin']}>
          <Login />
        </MemoryRouter>
      </Provider>,
    );
    const loginFormUsernameInput = screen.getByTestId('account-username');
    const longText =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    fireEvent.change(loginFormUsernameInput, { target: { value: longText } });
    expect(loginFormUsernameInput.value.slice(0, 50)).toBe('Lorem Ipsum is simply dummy text of the printing a');
  });

  it('submit without value', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/signin']}>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    const loginFormButton = screen.getByTestId('login-button');
    fireEvent.click(loginFormButton);
    await new Promise((r) => setTimeout(r, 2000));
    // eslint-disable-next-line testing-library/no-node-access
    const listTextField = document.body.querySelector('.MuiInputBase-root.MuiInput-root.MuiInput-underline');
    expect(listTextField).toHaveClass('Mui-error');
  });
});
