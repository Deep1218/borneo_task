import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrafficLightComponent } from './components/traffic-light/traffic-light.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrafficLightComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Traffic Light Simulator';
  greenDuration: number = 5;
  currentActiveLight: number = 0;
  totalLights: number = 4;
  readonly durations = { green: 5, yellow: 1 };
  private greenTimerId: any =  null
  private yellowTimerId: any =  null

  ngOnInit(): void {
    this.startCycle();
  }

  startCycle(): void {
    this.durations.green = this.greenDuration;
    this.cycleLights();
  }

  cycleLights(): void {
    let greenDurationMs = this.durations.green * 1000;
    let yellowDurationMs = this.durations.yellow * 1000;
    this.greenTimerId = setTimeout(() => {      
      this.yellowTimerId = setTimeout(() => {
        this.currentActiveLight = (this.currentActiveLight + 1) % this.totalLights;
        this.cycleLights();
      }, yellowDurationMs);
    }, greenDurationMs);
  }
  updateGreenDuration(duration: number): void {
    this.greenDuration = duration;
    this.durations.green = duration;
    this.clearTimers()
    this.startCycle()
    
  }
  clearTimers(){
    clearTimeout(this.greenTimerId)
    clearTimeout(this.yellowTimerId)
  }
  validate(){
    if(this.greenDuration <= 0){
      this.greenDuration = 1
    }
  }
}
