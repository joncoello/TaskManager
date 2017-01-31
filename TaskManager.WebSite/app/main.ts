//entry point to aapplication - only bootstrap module

/// <reference path="../typings/globals/core-js/index.d.ts" />
// Above fixes typing issue identified here http://stackoverflow.com/questions/33332394/angular-2-typescript-cant-find-names

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);