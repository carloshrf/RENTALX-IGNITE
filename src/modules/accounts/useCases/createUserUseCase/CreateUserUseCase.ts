import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    
    if (user) {
      throw new Error('Email was already used')
    }
    
    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export default CreateUserUseCase;