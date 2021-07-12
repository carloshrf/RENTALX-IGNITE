import { classToClass } from 'class-transformer';

import IUserResponseDTO from '../dtos/IUserResponseDTO';
import User from '../infra/typeorm/entities/User';

class UserMap {
  static toDto({
    name,
    email,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      name,
      email,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export default UserMap;
