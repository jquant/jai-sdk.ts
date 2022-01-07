/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */

import {Initializer} from "./ioc/register";

Initializer.initializeInversionOfControl();
