import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiService {

  constructor() { }

  public static apiURL: string = 'http://localhost:8080';
}
