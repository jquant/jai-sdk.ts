// import "reflect-metadata"
// import {container} from "tsyringe";
// import {AxiosHttpClientAuthenticator} from "./authentication/authentication";
// import {Initializer} from "./ioc/register";
//
// /**
//  * This file is the entrypoint of browser builds.
//  * The code executes when loaded in a browser.
//  */
// export const authenticate = (apiKey: string) => {
//     console.log('authenticate called')
//     // const instance = container.resolve(AxiosHttpClientAuthenticator);
//     // instance.authenticate(apiKey);
// }
//
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// (window as any).authenticate = authenticate;  // instead of casting window to any, you can extend the Window interface: https://stackoverflow.com/a/43513740/5433572
//
// Initializer.initializeInversionOfControl();
//
// console.log('Browser Initialized')
