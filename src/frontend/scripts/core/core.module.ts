import {ErrorHandler, NgModule, Optional, SkipSelf} from "@angular/core";
import {APIService} from "./services/api.service";
import {LoaderService} from "./services/loader.service";
import {CustomErrorHandler} from "./error-handler";
import {HttpModule} from "@angular/http";
import {AnalyticsService} from "./services/analytics.service";
import {VotingService} from "./services/voting.service";

/**
 * This module contains the service and other things which should only load once in the application.
 */
@NgModule({
    imports: [
        HttpModule,
    ],
    declarations: [],
    exports: [],
    providers: [
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler
        },
        AnalyticsService,
        APIService,
        LoaderService,
        VotingService
    ],
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() otherCoreModule: CoreModule) {
        if (otherCoreModule) {
            throw new Error("The Core Module was imported twice. It can only be imported once (in the root module)");
        }
    }

}
