import CarImage from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create(car_id: string, images_name: string): Promise<CarImage>;
  findByCarId(car_id: string): Promise<CarImage[]>;
  deleteByImageName(image_name: string): Promise<void>;
}

export default ICarsImagesRepository;
