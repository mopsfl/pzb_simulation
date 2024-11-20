"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get_width(el) {
        return parseInt(/\d+/gm.exec(el.css("width"))[0]);
    },
    clamp(num, min, max) {
        return num <= min ? min : num >= max ? max : num;
    },
};
