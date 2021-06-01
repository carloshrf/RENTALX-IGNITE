import { Entity, PrimaryColumn } from 'typeorm';

@Entity('cars')
class Car {
  @PrimaryColumn('uuid')
  id: string;
}

export default Car;
