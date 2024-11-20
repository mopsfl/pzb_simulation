"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Train = void 0;
const jquery_1 = __importDefault(require("jquery"));
const __1 = require("..");
const lodash_1 = require("lodash");
class Train {
    constructor() { }
    train = (0, jquery_1.default)(".train");
    drive_switch = (0, jquery_1.default)("#drive_state");
    speed_slider = (0, jquery_1.default)("#sim-train-speed");
    stat_distance_driven = (0, jquery_1.default)("#sim-stat-distancedriven");
    stat_train_speed = (0, jquery_1.default)("#sim-train-speed-display-value");
    track = __1.track.track;
    drive_state = 0;
    position = 0;
    speed = 0;
    maxSpeed = 160;
    speedPixelPerSec = 0;
    pixelPerFrame = 0;
    lastFrameTime = performance.now();
    fps = 60;
    frameTime = 1000 / this.fps;
    startTime = null;
    timeTaken = 0;
    keyDown = false;
    currentKeyDown = null;
    keyDownIncrement = 0;
    init() {
        this.drive_switch.val(this.drive_state);
        this.drive_switch.on("change", () => {
            this.drive_state = this.drive_state === 0 ? 1 : 0;
            this.drive_switch.val(this.drive_state);
        });
        this.speed_slider.on("change", () => { this.set_speed(this.get_speed()); });
        (0, jquery_1.default)(document).on("keyup", (e) => {
            if (this.keyDown && this.keyDownIncrement !== 0 && this.currentKeyDown === e.key) {
                this.keyDown = false;
                this.keyDownIncrement = 0;
                this.currentKeyDown = null;
                console.log(e.key, this.keyDownIncrement);
            }
        });
        (0, jquery_1.default)(document).on("keydown", (e) => {
            if ((e.key === "d" || e.key === "ArrowRight" || e.key === "w" || e.key === "ArrowUp") && this.speed < 160) {
                this.keyDown = true;
                this.keyDownIncrement = 1;
                this.currentKeyDown = e.key;
                this.set_speed((0, lodash_1.clamp)(this.get_speed() + this.keyDownIncrement, 0, this.maxSpeed));
                console.log(e.key, this.keyDown, this.currentKeyDown, this.keyDownIncrement);
            }
            if ((e.key === "a" || e.key === "ArrowLeft" || e.key === "s" || e.key === "ArrowDown") && this.speed > 0) {
                this.keyDown = true;
                this.keyDownIncrement = -1;
                this.currentKeyDown = e.key;
                this.set_speed((0, lodash_1.clamp)(this.get_speed() + this.keyDownIncrement, 0, this.maxSpeed));
                console.log(e.key, this.keyDown, this.currentKeyDown, this.keyDownIncrement);
            }
        });
        this.update();
        // -------------------------------- \\
        console.log("train initialized", this);
        return this;
    }
    update = () => {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;
        if (deltaTime >= this.frameTime) {
            this.speedPixelPerSec = this.speed * (1000 / 3600);
            if (this.drive_state === 1 && this.speed > 0 && this.position < 1500) {
                this.position += this.speedPixelPerSec * (deltaTime / 1000);
                this.position = Math.min(this.position, 1500);
                if (this.startTime === null) {
                    this.startTime = currentTime;
                }
                this.timeTaken = (currentTime - this.startTime) / 1000;
                this.set_position(this.position);
                this.stat_distance_driven.text(Math.round(this.position));
                console.log(this.position, this.speedPixelPerSec, this.timeTaken);
            }
            if (this.position >= 1500) {
                console.log(`Train reached the end in ${this.timeTaken.toFixed(2)} seconds.`);
            }
            this.lastFrameTime = currentTime - (deltaTime % this.frameTime);
        }
        requestAnimationFrame(this.update);
    };
    set_position(pos) {
        this.position = (0, lodash_1.clamp)(pos, 0, 1500);
        this.train.css("margin-left", `${this.position}px`);
        return this.position;
    }
    set_speed(val) {
        this.speed_slider.val(parseInt(val.toString()));
        this.stat_train_speed.text(val);
        this.speed = val;
    }
    get_speed() {
        return parseInt(this.speed_slider.val().toString());
    }
}
exports.Train = Train;
