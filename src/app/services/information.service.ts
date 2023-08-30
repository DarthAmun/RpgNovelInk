import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private _information: LooseObject = {
    char: {
      name: "CharName",
      level: 1,
      exp: 0,
      class: {
        name: "Sandkrieger"
      }
    }
  };

  set information (infos:LooseObject) {
    this._information = infos;
  }

  get information (): LooseObject {
    return this._information;
  }

  constructor() { }

  parse (infos:string) {
    let parsedInfos = JSON.parse(infos);
    if(parsedInfos !== undefined) {
      this._information = parsedInfos;
    }
  }
}

export interface LooseObject {
  [key: string]: any
}