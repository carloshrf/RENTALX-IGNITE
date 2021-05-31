import { AppError } from '@shared/errors/AppError';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from '../createUserUseCase/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to create a new user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456',
      email: 'email@email.com',
      name: 'New User',
      password: 'password',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not e able to authenticate a nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'email@email.com.br',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not e able to authenticate with a wrong password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456',
      email: 'email@email.com',
      name: 'New User',
      password: 'password',
    };
    await createUserUseCase.execute(user);

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: '1234567',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
