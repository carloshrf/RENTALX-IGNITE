import { getRepository, Repository } from 'typeorm';

import ICarsImagesRepository from '@modules/cars/repositories/ICarsImagesRepository';

import CarImage from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }

  async findByCarId(car_id: string): Promise<CarImage[]> {
    const carImages = this.repository.find({ car_id });

    return carImages;
  }

  async deleteByImageName(image_name: string): Promise<void> {
    this.repository.delete({ image_name })
  }
}

export default CarsImagesRepository;
