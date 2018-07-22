/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { StocksService } from './stocks.service';
import { MockStocksResponse, MockSymbolsList, MockNewsResponse } from "./stocks.mock";

describe('Service: Stocks', () => {
    const baseUrl = 'https://angular2-in-action-api.herokuapp.com';
    let service, http;

    beforeEach(() =>
        {
            TestBed.configureTestingModule({
                imports: [ HttpClientTestingModule ],
                providers: [ StocksService ]
            });
            service = TestBed.get(StocksService);
            http = TestBed.get(HttpTestingController);
        });

    afterEach(() => http.verify()); // Checks no Http request are pending after test.

    it("chould instantiate", () => expect(service).toBeTruthy());

    // This test just testing push/splice to/from the "stocks" array of the stocks.service.ts.
    it("should manage a list of stocks", () => {
        expect(service.get()).toEqual(MockSymbolsList);
        service.add("TEST");
        expect(service.get()).toEqual([...MockSymbolsList, "TEST"]); // Using spread operator for [].concat.call(MockSymbolsList, "TEST") replacement.
        service.remove("TEST");
        expect(service.get()).toEqual(MockSymbolsList);
    });

    it("should load the stock data from API", done => {
        debugger;
        // Does not make HTTP GET to https://angular2-in-action-api.herokuapp.com/stocks/snapshot?symbols=AAPL,GOOG,FB,AMZN,TWTR
        // "service" is an HttpTestController instance and uses some Xhrs interceptor internally.
        service.load(MockSymbolsList).subscribe(result => {
            expect(result).toEqual(MockStocksResponse);
            done();
        });

        // Test http request using HttpTestingController. If it fails, afterEach() callback function notifies about the error.
        const request = http.expectOne(baseUrl + "/stocks/snapshot?symbols=" + MockSymbolsList.join(","));

        // Complete the request we have subscribed in the line #38?
        request.flush(MockStocksResponse);
    });

    // This test is similar to the above one. The result is not from HTTP GET to
    // https://angular2-in-action-api.herokuapp.com/stocks/news/snapshot?source=abc.
    it("should load the news data from API", done => {
        service.getNewsSnapshot("abc").subscribe(result => {
            expect(result).toEqual(MockNewsResponse);
            done();
        });

        const request = http.expectOne(baseUrl + "/stocks/news/snapshot?source=abc");
        request.flush(MockNewsResponse);
    });
});
