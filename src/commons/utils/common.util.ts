/**
 * Copyright 2020 Amlan Chakrabarty<itsac13@gmail.com>. All Rights Reserved
 */

import * as electron from "electron"
import { Constants } from '../constants/constants';

export class CommonUtils {

    public static getAppInstalledPath(): string {
        let appPath = Constants.EMPTY_STRING;
        if (electron) {

            appPath = electron.remote.app.getAppPath();

            // Don't update the file path if the application started locally using 'yarn start'
            // installer path contains 'node_modules' if run locally
            const runFromInstaller: boolean = appPath.indexOf(Constants.NODE_MODULES) === -1;
            if (runFromInstaller) {
                appPath = appPath.substring(0, appPath.indexOf(Constants.NODE_MODULES));
            } else {
                appPath = Constants.EMPTY_STRING;
            }
        }

        return appPath;
    }

    public static getUserDirPath(): string {
        return electron.remote.app.getPath("userData");
    }

}