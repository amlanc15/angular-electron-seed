/**
 * Copyright 2020 Amlan Chakrabarty<itsac13@gmail.com>. All Rights Reserved
 */

import { Component, OnInit } from '@angular/core';
import { LoggerConfigService } from "../node-services/logger.config.service"
import * as logger from "winston";
import * as os from "os";
import { CommonUtils } from "../commons/utils/common.util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public ngOnInit(): void {
    LoggerConfigService.iniLogger(CommonUtils.getUserDirPath());
    logger.info("****************************************************************************");
    logger.info("*************************** Application Started ****************************");
    logger.info("*                       Angular Electron (v0.0.0)                          *");
    logger.info("****************************************************************************");
    logger.info("*************************       OS - ", os.platform(), "      *************************");
   }

  title = 'angular-electron';
}
