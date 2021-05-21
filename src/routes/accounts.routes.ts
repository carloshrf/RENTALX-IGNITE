import { Router } from 'express';

import CreateUserController from '../modules/accounts/useCases/createUserUseCase/CreateUserController';

const accountsRoutes = Router();

const createUserController = new CreateUserController();

accountsRoutes.post('/', createUserController.handle);

export default accountsRoutes;
