import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

class SpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}

export default SpecificationsRepository;
