import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specification = this.specificationRepository.findByName(name);

    if (specification) {
      throw new Error('Specification name alread exists');
    }

    this.specificationRepository.create({ name, description });
  }
}

export default CreateSpecificationUseCase;
