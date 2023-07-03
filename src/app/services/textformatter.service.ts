import { Injectable } from '@angular/core';
import { InformationService, LooseObject } from './information.service';

@Injectable({
  providedIn: 'root'
})
export class TextformatterService {

  constructor(private infromation: InformationService) { }

  format(text: string): string {
    const regex = /({{[a-zA-Z]+(\.([a-zA-Z])+)*}})|(\[\[[a-zA-Z]+(\.([a-zA-Z])+)*(\+|\-)*\]\])/;

    let infos: LooseObject = this.infromation.information;
    let arr;
    while ((arr = regex.exec(text)) !== null) {
      const code: string = arr[0].replaceAll("{", "").replaceAll("}", "").replaceAll("[", "").replaceAll("]", "").replaceAll("+", "").replaceAll("-", "");
      let actions: string[] = code.split(".");

      if (arr[0].includes("[")) {
        infos = this.updateInfos(arr[0], infos, actions);
        text = text.replace(arr[0], "");
      }

      let info: any = infos;
      for (let action of actions) {
        if (info === undefined) break;
        info = info[action];
      }

      if (typeof info === 'object') {
        text = text.replace(arr[0], `<span class="error">[Property name missing]</span>`);
      } else if (info === undefined) {
        text = text.replace(arr[0], `<span class="error">[Not found]</span>`);
      }

      console.log(code)

      text = text.replace(arr[0], `<div class="replaced">${info}<span class="tooltiptext">${code}</span></div>`);
    }

    return text;
  }

  updateInfos(code: string, infos: LooseObject, actions: string[]): LooseObject {
    let info: any = infos;
    let infoParts: { info: any, action: string }[] = [];
    for (let action of actions) {
      if (info === undefined) break;
      infoParts.push({ info: info[action], action: action });
      info = info[action];
    }

    switch (true) {
      case code.includes("+"):
        info++;
        break;
      case code.includes("-"):
        info--;
        break;
    }

    infoParts[infoParts.length - 1].info = info;

    let modifiedInfo = infoParts[0].info;
    for (let i = 0; i < infoParts.length; i++) {
      modifiedInfo[infoParts[i].action] = infoParts[i].info;
    }

    return modifiedInfo;
  }
}
