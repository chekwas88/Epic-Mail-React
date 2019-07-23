import nock from 'nock';
import { registerAction, loginAction } from '../../redux/actions/authActions';
import mockUser from '../mockData/mockUser';

const userData = {
  email: 'klaus@epicmail.com',
  password: 'password',
};

const history = { push: jest.fn() };

describe('authAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should register a user', (done) => {
    nock('https://agentcorvinus-epic-mail.herokuapp.com')
      .post('/v1/api/auth/signup')
      .reply(201, {
        message: 'user registration was successful',
        user: {
          id: 24,
          firstName: 'Klaus',
          lastName: 'Michealson',
          email: 'klaus@epicmail.com',
          userName: 'hybrid',
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI0LCJlbWFpbCI6InByaW5jZXNzQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiZ3IiLCJpYXQiOjE1NjI1Mjg2NTcsImV4cCI6MTU2MzEzMzQ1N30.oWthtPvSh-zz4RwgHZsJtdxpjhHlUKix0oK1I9nqkOA',
      });
    expect(registerAction(mockUser, history)).toMatchSnapshot();
    done();
  });

  it('should return an error when user exits', (done) => {
    const error = 'This username is already in use';
    nock('https://agentcorvinus-epic-mail.herokuapp.com')
      .post('/v1/api/auth/signup')
      .reply(400, { error });
    expect(registerAction({})).toMatchSnapshot();
    done();
  });

  it('Logs in a user', (done) => {
    nock('https://agentcorvinus-epic-mail.herokuapp.com')
      .post('/v1/api/auth/login', { email: 'klaus@epicmail.com', password: 'password' })
      .reply(201, {
        message: 'user registration was successful',
        user: {
          id: 24,
          firstName: 'Klaus',
          lastName: 'Michealson',
          email: 'klaus@epicmail.com',
          userName: 'hybrid',
        },
        token:
          'klwmac.,x;l/,.;l,qwakwehfhioqfhhbncnk'
      });
    expect(loginAction(userData, history)).toMatchSnapshot();
    done();
  });

  it('Logs in a user', (done) => {
    nock('https://agentcorvinus-epic-mail.herokuapp.com')
      .post('/v1/api/auth/login')
      .replyWithError();
    expect(loginAction(userData, history)).toMatchSnapshot();
    done();
  });
});
