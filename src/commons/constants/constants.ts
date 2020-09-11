/**
 * Copyright 2020 Amlan Chakrabarty<itsac13@gmail.com>. All Rights Reserved
 */

import * as path from "path"

export class Constants {

    public static readonly EMPTY_STRING = "";
    public static readonly NODE_MODULES = "node_modules";

    public static readonly LOGGER_CONFIG_JSON_FILE_PATH = path.join("config", "logger-config.json");
    public static readonly DEFAULT_FOLDER_NAME_LOGS = "logs";
    public static readonly DEFAULT_LOG_FILE_NAME = "angular-electron.log";
    public static readonly DEFAULT_ERR_LOG_FILE_NAME = "angular-electron-error.log";
    public static readonly DEFAULT_DATE_PATTERN = "yyyy-MM-dd";
    public static readonly DEFAULT_LOG_LEVEL = "info";
    public static readonly DEBUG_LOG_LEVEL = "debug";

}