import $ from "jquery";

export default {
    get_width(el: JQuery<HTMLElement>) {
        return parseInt(/\d+/gm.exec(el.css("width"))[0])
    },

    clamp(num: number, min: number, max: number) {
        return num <= min ? min : num >= max ? max : num
    },
}