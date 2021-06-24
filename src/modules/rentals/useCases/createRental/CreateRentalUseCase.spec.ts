import dayjs from 'dayjs';

import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import DayJsDateProvider from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import RentalsRepositoryInMemory from '../../repositories/inMemory/RentalsRepositoryInMemory';
import CreateRentalUseCase from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsProvider: DayJsDateProvider;

describe('Create Rental', () => {
  const dayPast24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsProvider = new DayJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '54321',
      expected_return_date: dayPast24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is already an current rental for the user', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '54321',
      expected_return_date: dayPast24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '21212',
        expected_return_date: dayPast24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to rent a car if it is already rented', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '54321',
      expected_return_date: dayPast24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12121',
        car_id: '54321',
        expected_return_date: dayPast24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental with the turnaround time before 24 hours of time of rental', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12121',
        car_id: '54321',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
