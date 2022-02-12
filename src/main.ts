import "reflect-metadata"
import {Initializer} from "./ioc/register";
import {container} from "tsyringe";
import {StatusGetter} from "./api/status/status-getter";
import {AxiosHttpClientAuthenticator} from "./authentication/authentication";

Initializer.initializeInversionOfControl();

export const GetStatus = async () => {
    const getter = container.resolve(StatusGetter);
    return getter.getStatus();
}

export const Authenticate = (apiKey: string) => {
    const authenticator = container.resolve(AxiosHttpClientAuthenticator);
    authenticator.authenticate(apiKey);
}

module.exports = {
    GetStatus,
    Authenticate,
}
