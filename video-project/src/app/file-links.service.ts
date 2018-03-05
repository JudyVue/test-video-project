import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFileLinks } from './file-links';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileLinksService {

  constructor(private http: HttpClient) { }
  private _url = '../assets/file-links.json';

  getFileLinks(): Observable<IFileLinks> {
    console.log('inside getFileLinks?');
    return this.http.get<IFileLinks>(this._url);
  }

}
