import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      specification => specification.name === name,
    );

    return specification;
  }
  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    const newSpecification = { description, name };

    Object.assign(specification, newSpecification);

    this.specifications.push(specification);

    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );

    return specifications;
  }
}

export default SpecificationsRepositoryInMemory;
