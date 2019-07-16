import {
  registerAction,
} from '../../redux/actions/authActions';
import 'regenerator-runtime';

describe('test for auth actions', () => {
  test('should setup register action', async () => {
    const user = {
      firstName: 'chisom',
      lastName: 'chekwas',
      password: '12345678',
      confirmPassword: '12345678',
      email: 'ipman@mail.com',
    };
    const action = await registerAction(user);
    expect(action).toEqual({
      type: 'REGISTER_USER',
      payload: {
        firstname: 'chisom',
        lastname: 'chekwas',
        token: expect.any(String),
      }
    });
  });
});
