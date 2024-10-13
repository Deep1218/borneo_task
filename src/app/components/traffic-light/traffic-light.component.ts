import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.scss',
})
export class TrafficLightComponent {
  @Input() lightIndex: number = 0;
  @Input() activeLight: number = 0;
  @Input() duration: number = 5;
  currentColor: string = 'red';
  private intervalId: any = null;
  durationCounter = { green: 0, red: 0 };

  ngOnChanges(): void {
    this.updateLight();
  }

  ngOnInit(): void {
    this.updateLight();
  }

  updateLight(): void {
    this.currentColor = 'red';

    if (this.lightIndex === this.activeLight) {
      this.currentColor = 'green';
      this.durationCounter.green = this.duration;
    } else if (
      (this.activeLight === 3 && this.lightIndex === 0) ||
      this.lightIndex === this.activeLight + 1
    ) {
      this.durationCounter.red = this.duration + 1;
    } else {
      this.durationCounter.red = (this.duration + 1) * this.getMultipler();
    }
    this.checkInterval()
    
  }
  checkInterval(): void{
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      if (this.durationCounter.green) {
        this.durationCounter.green -= 1;
      }
      if (
        this.durationCounter.green == 0 &&
        this.lightIndex === this.activeLight
      ) {
        this.currentColor = 'yellow';
      }
      if (this.durationCounter.red) {
        this.durationCounter.red -= 1;
      }
      // if(this.lightIndex === this.activeLight) console.log(this.durationCounter);
    }, 1000);
  }
  getMultipler(): number{
    let multipler: number = this.activeLight - this.lightIndex;
      
      if (this.lightIndex === this.activeLight - 1) {
        multipler = 3;
      }
      if (this.activeLight < this.lightIndex) {
        multipler = this.lightIndex - this.activeLight;
      }
    return multipler
  }
}
