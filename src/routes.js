import { Router } from 'express';
import multer from 'multer';
import multerConfig from './app/config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';
import ProviderController from './app/controllers/ProviderController';
import Appointments from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Rotas acessadas apenas com autenticação
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);
routes.post('/appointments', Appointments.store);
routes.get('/appointments', Appointments.index);
routes.delete('/appointments/:id', Appointments.delete);
routes.get('/schedule', ScheduleController.index);
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
