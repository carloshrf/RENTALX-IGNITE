import { inject, injectable } from 'tsyringe';

import CarsImageRepository from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: CarsImageRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.forEach(image => {
      this.carsImagesRepository.create(car_id, image);
    });
  }
}

export default UploadCarImagesUseCase;
