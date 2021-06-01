import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Uno',
      description: 'A compact car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      brand: 'Brand',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should no be able to create a new car with an existing license plate', async () => {
    await createCarUseCase.execute({
      name: 'Uno',
      description: 'A compact car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      brand: 'Brand',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: 'Palio',
        description: 'A car',
        daily_rate: 110,
        license_plate: 'ABC-1234',
        brand: 'Brand',
        fine_amount: 50,
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create a new car as available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Uno',
      description: 'A compact car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      brand: 'Brand',
      fine_amount: 60,
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
