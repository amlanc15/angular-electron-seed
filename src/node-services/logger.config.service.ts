/**
 * Copyright 2020 Amlan Chakrabarty<itsac13@gmail.com>. All Rights Reserved
 */

import * as logger from "winston";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as DailyRotateFile from "winston-daily-rotate-file"
import { CommonUtils } from "../commons/utils/common.util";
import { Constants } from "../commons/constants/constants";

export class LoggerConfigService {

    private static instance: LoggerConfigService;

    public static iniLogger(inputPath?: string): void {

        if(!LoggerConfigService.instance) {
            // Do work
            this.instance = new LoggerConfigService();
            const logDir = inputPath ? inputPath : os.tmpdir();

            LoggerConfigService.initialize(logDir);

        }

    }
    private constructor() {}

    private static initialize(mainFolderPath: string): void {
        try {
            const appInstalledPath = CommonUtils.getAppInstalledPath();

            const loggerConfigObj = LoggerConfigService.readLoggerConfig(appInstalledPath);

            const logFolderName = loggerConfigObj && loggerConfigObj.dirName ?
                                        loggerConfigObj.dirName : Constants.DEFAULT_FOLDER_NAME_LOGS;

            const logFolderPath = LoggerConfigService.createLogFolderIfNotExists(mainFolderPath, logFolderName);

            const logFileName = loggerConfigObj && loggerConfigObj.fileName ?
                                                    loggerConfigObj.fileName : Constants.DEFAULT_LOG_FILE_NAME;

            const errFileName = loggerConfigObj && loggerConfigObj.errorFileName ?
                                    loggerConfigObj.errorFileName : Constants.DEFAULT_ERR_LOG_FILE_NAME;

            // Log printing in file transporter
            const fileTransporter = new DailyRotateFile({
                datePattern: loggerConfigObj && loggerConfigObj.datePattern ?
                                                    loggerConfigObj.datePattern : Constants.DEFAULT_DATE_PATTERN,
                filename: path.join(logFolderPath, logFileName),
                level: loggerConfigObj && loggerConfigObj.logLevel ?
                                            loggerConfigObj.logLevel : Constants.DEFAULT_LOG_LEVEL,
                json: false,
            });
            // Log printing in console transporter
            const consoleTransporter = new logger.transports.Console({
                level: Constants.DEBUG_LOG_LEVEL,
            });

            const exceptionHandlerTransport = new DailyRotateFile({
                filename: path.join(logFolderPath, errFileName),
                json: false,
            });

            // Configuring Logger
            logger.configure({
                transports: [fileTransporter, consoleTransporter],
                exceptionHandlers: [exceptionHandlerTransport],
            });
        }
        catch (error) {
            // tslint:disable-next-line:no-console
            console.log("Error in Initializing Logger", error);
        }
    }

    private static createLogFolderIfNotExists(mainFolderPath: string, logFolderName: any) {
        const logFolderPath = path.join(mainFolderPath, logFolderName);
        if (!fs.existsSync(logFolderPath)) {
            fs.mkdirSync(logFolderPath);
        }
        return logFolderPath;
    }

    private static readLoggerConfig(appInstalledPath: string): any {
        let loggerConfigObj;
        if(appInstalledPath.length === 0) {
            return loggerConfigObj;
        }
        // Read Logger config File
        const loggerCfgFilePath = path.join(appInstalledPath, Constants.LOGGER_CONFIG_JSON_FILE_PATH);
        try {
            const loggerCfgString = fs.readFileSync(loggerCfgFilePath).toString();
            loggerConfigObj = JSON.parse(loggerCfgString);
        }
        catch (error) {
            // tslint:disable-next-line:no-console
            console.log("Error while reading logger Config File");
        }
        return loggerConfigObj;
    }
}