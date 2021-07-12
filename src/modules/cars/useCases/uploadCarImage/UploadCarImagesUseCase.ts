import { inject, injectable } from 'tsyringe';

import CarsImageRepository from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';
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
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImages = await this.carsImagesRepository.findByCarId(car_id);

    if (carImages.length) {
      carImages.forEach(async image => {
        await deleteFile(`./tmp/cars/${image.image_name}`);
        await this.carsImagesRepository.deleteByImageName(image.image_name);
        await this.storageProvider.delete(image.image_name, 'cars');
      });
    }

    images_name.forEach(async image => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}

export default UploadCarImagesUseCase;
