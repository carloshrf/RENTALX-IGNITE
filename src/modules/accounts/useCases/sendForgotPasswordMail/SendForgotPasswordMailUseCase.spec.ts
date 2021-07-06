import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokenRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import DayJsDateProvider from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

describe('Send Forgot Password Mail', () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
  let dateProvider: IDateProvider;
  let mailProvider: MailProviderInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('Should be able to send a forgot mail password to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '325222',
      email: 'sahifago@mouh.cl',
      name: 'Mina Brown',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('sahifago@mouh.cl');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send a forgot mail password if the user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('di@kok.ma'),
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  it('Should be able to create a user token', async () => {
    const generateTokenMail = spyOn(usersTokenRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      driver_license: '44554',
      email: 'nimreg@hohur.io',
      name: 'Nathaniel Matthews',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('nimreg@hohur.io');

    expect(generateTokenMail).toBeCalled();
  });
});
