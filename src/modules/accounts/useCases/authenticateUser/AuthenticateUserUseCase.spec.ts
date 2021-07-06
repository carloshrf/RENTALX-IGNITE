import UsersTokenRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import DayJsDateProvider from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from '../createUserUseCase/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: IDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
    );

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
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
