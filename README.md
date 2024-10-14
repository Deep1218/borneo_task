# Borneo Assignment

## Problem Statement

Develop a web-based simulation for a traffic light system at a four-road junction. This system
should manage traffic flow by controlling the light sequences—green, yellow, and red—with
specific durations for each light. The yellow light duration is fixed at 1 second, the green light at
5 seconds, and the red light’s duration adjusts automatically based on the other lights. The
application must provide a user interface to visually represent this logic, where each signal is
displayed using colored divs that change according to the light status.

### Light Timing:
* The yellow light should last 1 second.
* The green light should last 5 seconds by default, but this should be configurable
by the user.
* The red light’s duration should be dynamically calculated based on the status of
the other three lights.

## Architecture & Technologies Used:
* Node - v20.11.1
* Angular - v17.3.2
* Typescript - v5.4.2
* Tailwind - v3.4.13

```
berneo_task/
├── node_modules/
│   └── ...
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── traffic-light/
│   │   │   │   ├── traffic-light.component.ts
│   │   │   │   ├── traffic-light.component.html
│   │   │   │   └── traffic-light.component.scss
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts
│   │   └── app-routes.ts
│   │
│   ├── assets/
|   |   └── ...
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── .editorconfig
├── .gitignore 
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```
## Instructions to Run
1. Clone the repository or download the zip file.
2. Run `npm install` to install all dependencies (ensure Node.js is installed on your system).
3. Start the development server using `ng serve`. Then, navigate to http://localhost:4200/. The simulation will automatically start with the green light set to the default 5 seconds.
   
## Logical Explaination

### Key Concepts:
- Traffic Lights: The system has multiple lights (green, yellow, red), and the lights will cycle through these states based on a timer.
- Timers: Each light has a duration (in seconds), determining how long it stays in its current state before switching to the next.
- Active Light: This represents which light is currently in focus (for example, green, followed by yellow and red).
- Durations: Durations for each light state (green, yellow, red) are tracked and decremented over time.

So the code is divided into 2 sections.

### Section 1:
1. `startCycle()`:
    - It initializes the cycle by setting the green light's duration (this.durations.green) and starts the light cycle by calling `cycleLights()`.

2. `cycleLights()`:
    - It converts the green and yellow durations to milliseconds.
    - A timer (`setTimeout`) is started for the green light, and when the green light duration is over, it triggers another timer for the yellow light.
    - After the yellow light timer finishes, the active light is updated (cycled to the next light). This repeats in a loop by calling `cycleLights()` again, thus ensuring continuous cycling.

3. `updateGreenDuration(duration: number)`:
    - This function allows updating the green light duration dynamically.
    - It clears any existing timers using `clearTimers()` to prevent overlapping.
    - The cycle is restarted with the new green duration.

4. `clearTimers()`:
    - Clears both the green and yellow timers, effectively stopping the current cycle until the timers are reset.

### Section 2:
This section focuses on more detailed control of individual lights, durations, and intervals.

1. `updateLight()`:
    - Sets the current light's color to red by default.
    - If the current light (`lightIndex`) matches the active light, it changes the color to green and sets the green light's duration (`durationCounter.green`).
    - If the current light is just after the active light, it sets the red light’s duration (`durationCounter.red`).
    - Otherwise, it applies a duration for the red light with a calculated multiplier (`getMultipler()`), which accounts for the order of the lights.
    - It then calls `checkInterval()` to manage the timers.

2. `checkInterval()`:
    - This function continuously runs in a 1-second interval (via `setInterval()`).
    - It decrements the green light's duration (`durationCounter.green`) each second.
    - When the green light duration reaches zero, it changes the light color to yellow (if the current light is active).
    - Similarly, it decrements the red light’s duration (`durationCounter.red`).

3. `getMultipler()`:
    - It calculates how far the current light is from the active light.
    - It returns a multiplier based on the position difference, which is used to adjust the red light’s duration.
    - Special handling is done when the light immediately precedes the active light.
