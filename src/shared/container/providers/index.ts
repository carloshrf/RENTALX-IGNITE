import { container } from 'tsyringe';

import './MailProvider';
import { IDateProvider } from './DateProvider/IDateProvider';
import DayJsDateProvider from './DateProvider/implementations/DayJsDateProvider';
import LocalStorageProvider from './StorageProvider/implementations/LocalStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';
import IStorageProvider from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider,
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK],
);
