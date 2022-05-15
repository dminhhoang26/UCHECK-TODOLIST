import { Todo } from './todo.model';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { ApiException } from './ApiException'

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceProxy {
  private http: HttpClient;
  private baseUrl: string = env.apiBaseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'dataType': 'json'
  })
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient) {
    this.http = http;
  }

  addTodo(body: any | undefined): Observable<any> {
    let url_ = this.baseUrl + `/api/task/create`
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: this.headers,
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processRespone(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processRespone(<any>response_);
        } catch (e) {
          return <Observable<any>><any>_observableThrow(e);
        }
      } else
        return <Observable<any>><any>_observableThrow(response_);
    }));
  }

  protected processRespone(response: HttpResponseBase): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200;
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return this.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<any>(<any>null);
  }

  getAllTodos(input): Observable<any> {
    let params = Object.assign({}, {
      userId: undefined,
    }, input)
    let url_ = this.baseUrl + `/api/task/search`
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(params);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: this.headers,
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processRespone(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processRespone(<any>response_);
        } catch (e) {
          return <Observable<any>><any>_observableThrow(e);
        }
      } else
        return <Observable<any>><any>_observableThrow(response_);
    }));
  }

  search(input): Observable<any> {
    let params = Object.assign({}, {
      userId: undefined,
      createdDate: undefined,
    }, input)
    let url_ = this.baseUrl + `/api/task/search`
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(params);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: this.headers,
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processRespone(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processRespone(<any>response_);
        } catch (e) {
          return <Observable<any>><any>_observableThrow(e);
        }
      } else
        return <Observable<any>><any>_observableThrow(response_);
    }));
  }

  updateTodo(updatedTodo: Todo): Observable<any> {
    let url_ = this.baseUrl + `/api/task/update`
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(updatedTodo);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: this.headers,
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processRespone(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processRespone(<any>response_);
        } catch (e) {
          return <Observable<any>><any>_observableThrow(e);
        }
      } else
        return <Observable<any>><any>_observableThrow(response_);
    }));
  }

  deleteTodo(taskId: number): Observable<any> {
    let url_ = this.baseUrl + `/api/task/delete`
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify({id: taskId});

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: this.headers,
    };

    return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processRespone(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processRespone(<any>response_);
        } catch (e) {
          return <Observable<any>><any>_observableThrow(e);
        }
      } else
        return <Observable<any>><any>_observableThrow(response_);
    }));
  }

  throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
      return _observableThrow(result);
    else
      return _observableThrow(new ApiException(message, status, response, headers, null));
  }

  blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next("");
        observer.complete();
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          observer.next((<any>event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }
}
