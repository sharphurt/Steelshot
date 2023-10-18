import {hideVideoControls, initializeLenis, initializeWindow, scaleToFit} from "./common.js";

const onPageLoaded = () => {
    initializeWindow();
    hideVideoControls();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    initializeLenis()
}

$(document).ready(() => onPageLoaded())