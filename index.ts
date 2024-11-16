import $ from "jquery";
import jQuery from "jquery";
import { Track } from "./modules/Track";
import { Train } from "./modules/Train";

// -------------------------------- \\

const track = new Track().init(),
    train = new Train().init()

M.Range.init($(".range-field>input"))
M.Tooltip.init($(".tooltipped"))

// -------------------------------- \\

const indicators: Map<string | number, Indicator> = new Map()

$(".indicator").each((i, ind) => {
    let el = $(ind),
        id = parseInt(el.attr("idx"))

    indicators.set(id, {
        element: el,
        name: el.attr("name"),
        id: id,
        active: false,
        toggle: (state, blink) => {
            state = (state !== undefined) ? state : !(el.hasClass("active") || el.hasClass("active-blink"));
            state ? (blink ? el.addClass("active-blink") : el.addClass("active")) : el.removeClass("active active-blink");
        }
    })

    $(`input[idx=${id}]`).on("click", (e) => {
        let el = $(e.currentTarget),
            id = parseInt(el.attr("idx")),
            indicator = indicators.get(id),
            state = el.val() == "on" ? true : false

        indicator.active = state
        indicator.toggle(state)
        el.val() == "on" ? el.val("off") : el.val("on")

        console.log(indicators);
    })
})

window["indicators"] = indicators
window["train"] = train
window["track"] = track

// -------------------------------- \\

export interface Indicator {
    element: HTMLElement | JQuery<Element>,
    name: string,
    id: number,
    active: boolean,
    toggle: ((state?: boolean, blink?: boolean) => void)
}

export { track, train }