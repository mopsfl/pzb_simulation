"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const jquery_1 = __importDefault(require("jquery"));
const Misc_1 = __importDefault(require("./Misc"));
class Track {
    constructor() { }
    track = (0, jquery_1.default)(".track");
    track_length = 0;
    init() {
        this.track_length = Misc_1.default.get_width(this.track);
        // -------------------------------- \\
        console.log("track initialized", this);
        return this;
    }
}
exports.Track = Track;
