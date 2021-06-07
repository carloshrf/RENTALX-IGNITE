import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Palio',
      description: 'A car',
      daily_rate: 90,
      license_plate: 'ACB-1432',
      brand: 'Fiat',
      fine_amount: 55,
      category_id: 'categoria',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all avaible cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Celta',
      description: 'A car',
      daily_rate: 90,
      license_plate: 'ABC-1345',
      brand: 'Chevrolet',
      fine_amount: 55,
      category_id: 'categoria',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Celta',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all avaible cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Celta',
      description: 'A car',
      daily_rate: 90,
      license_plate: 'ABC-1345',
      brand: 'Chevrolet',
      fine_amount: 55,
      category_id: 'categoria',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Chevrolet',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all avaible cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Celta',
      description: 'A car',
      daily_rate: 90,
      license_plate: 'ABC-1345',
      brand: 'Chevrolet',
      fine_amount: 55,
      category_id: 'categoria',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'categoria',
    });

    expect(cars).toEqual([car]);
  });
});
