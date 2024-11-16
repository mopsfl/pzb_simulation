import $ from "jquery";
import Misc from "./Misc";

export class Track {
    constructor() { }

    track = $(".track")
    track_length = 0

    init() {

        this.track_length = Misc.get_width(this.track)

        // -------------------------------- \\
        console.log("track initialized", this);
        return this
    }
}