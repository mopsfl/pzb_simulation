import $ from "jquery";
import Misc from "./Misc";
import { track } from "..";
import { clamp } from "lodash";

export class Train {
    constructor() { }

    train = $(".train")
    drive_switch = $("#drive_state")
    speed_slider = $("#sim-train-speed")
    stat_distance_driven = $("#sim-stat-distancedriven")

    track = track.track
    drive_state = 0
    position = 0
    speed = 0

    speedPixelPerSec = 0
    pixelPerFrame = 0

    lastFrameTime = performance.now()
    fps = 60
    frameTime = 1000 / this.fps

    startTime = null
    timeTaken = 0

    init() {
        this.drive_switch.val(this.drive_state)
        this.drive_switch.on("change", () => {
            this.drive_state = this.drive_state === 0 ? 1 : 0;
            this.drive_switch.val(this.drive_state)
        })

        this.speed_slider.on("change", () => {
            this.speed = parseInt(this.speed_slider.val().toString())
        })

        this.update()
        // -------------------------------- \\
        console.log("train initialized", this);
        return this
    }

    update = () => {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;

        if (deltaTime >= this.frameTime) {
            this.speedPixelPerSec = this.speed * (1000 / 3600)

            if (this.drive_state === 1 && this.speed > 0 && this.position < 1500) {
                this.position += this.speedPixelPerSec * (deltaTime / 1000)
                this.position = Math.min(this.position, 1500)

                if (this.startTime === null) {
                    this.startTime = currentTime
                }

                this.timeTaken = (currentTime - this.startTime) / 1000
                this.set_position(this.position)
                this.stat_distance_driven.text(Math.round(this.position))

                console.log(`pos: ${this.position.toFixed(2)}, speed (px/s): ${this.speedPixelPerSec.toFixed(2)}, time: ${this.timeTaken.toFixed(2)} s`)
            }

            if (this.position >= 1500) {
                console.log(`Train reached the end in ${this.timeTaken.toFixed(2)} seconds.`)
            }

            this.lastFrameTime = currentTime - (deltaTime % this.frameTime)
        }

        requestAnimationFrame(this.update)
    }


    set_position(pos: number) {
        this.position = clamp(pos, 0, 1500)
        this.train.css("margin-left", `${this.position}px`)

        return this.position
    }
}