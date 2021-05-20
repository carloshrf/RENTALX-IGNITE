import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specification = await this.specificationRepository.findByName(name);

    if (specification) {
      throw new Error('Specification name alread exists');
    }

    await this.specificationRepository.create({ name, description });
  }
}

export default CreateSpecificationUseCase;
