import { AxiosConfig } from "../../../models/AxiosConfig";
import { FACEIT_API_KEY } from "../const/base";

export const authorizationInterceptor = (config: AxiosConfig) => {
    if (!config.headers) {
        config.headers = {};
    }

    config.headers.Authorization = `Bearer ${FACEIT_API_KEY}`;
    return config;
};