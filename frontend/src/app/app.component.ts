import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  public spinnerConfig: any = {
    bdColor: 'rgba(51,51,51,0.8)',
    size: 'large',
    color: '#fff',
    type: 'ball-pulse-sync',
    loadigText: 'Cargando ...'
  };

}
