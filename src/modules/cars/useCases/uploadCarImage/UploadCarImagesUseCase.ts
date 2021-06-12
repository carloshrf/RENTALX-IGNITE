import { inject, injectable } from 'tsyringe';

import CarsImageRepository from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { deleteFile } from '@utils/file';

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
    const carImages = await this.carsImagesRepository.findByCarId(car_id)

    if (carImages.length) {
      carImages.forEach(async image => {
        await deleteFile(`./tmp/cars/${image.image_name}`);
        await this.carsImagesRepository.deleteByImageName(image.image_name)
      })
    }

    images_name.forEach(image => {
      this.carsImagesRepository.create(car_id, image);
    });
  }
}

export default UploadCarImagesUseCase;
