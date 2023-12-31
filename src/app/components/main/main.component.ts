import { Component } from '@angular/core';
import { InformationService } from 'src/app/services/information.service';
import { TextformatterService } from 'src/app/services/textformatter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public formattedText: string = "";
  public text: string = "";
  public infos: string = "";

  constructor(private textformatter: TextformatterService, private information: InformationService) {
    this.text = localStorage.getItem("text") ?? "";
    this.infos = localStorage.getItem("infos") ?? "";

    if(this.infos !== ""){
      this.information.information = JSON.parse(this.infos);
    }

    this.infos = JSON.stringify(information.information, null, 2);
  }

  onInfosChange(event: Event) {
    const value = (event.target as any).value;
    this.infos = value;
  }

  onTextChange(event: Event) {
    const value = (event.target as any).value;
    this.text = value;
  }

  triggerFormatting() {
    this.infos = JSON.stringify(JSON.parse(this.infos), null, 2);
    this.information.parse(this.infos);

    this.formattedText = this.textformatter.format(this.text);

    localStorage.setItem("text", this.text);
    localStorage.setItem("infos", this.infos);
  }
}
