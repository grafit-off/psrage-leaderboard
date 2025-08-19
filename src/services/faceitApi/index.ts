import axios from 'axios';
import { FACEIT_API_URL } from './const/base';
import { authorizationInterceptor } from './interceptors/autorizationInterceptor';

const api = axios.create({
    baseURL: FACEIT_API_URL,
    timeout: 10000,
});

api.interceptors.request.use(authorizationInterceptor);

export default api;