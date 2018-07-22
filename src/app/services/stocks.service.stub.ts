// Stubbing asynchronous methods that require external dependencies line HttpClient in stocks.service.ts,
// namely load() and getNewsSnapshot().
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { MockNewsResponse, MockStocksResponse, MockSymbolsList } from "./stocks.mock";
import { StocksService } from "./stocks.service"  

export class StubStocksService extends StocksService {

    constructor () {
        super({} as HttpClient);
    }

    public load(symbols: string[]) {
        return Observable.of(MockStocksResponse);
    }

    public getNewsSnapshot(source: string) {
        return Observable.of(MockNewsResponse);
    }
}