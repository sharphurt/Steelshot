import {hideVideoControls, initializeCursor, initializeLenis, initializeWindow, scaleToFit} from "./common.js";
import {slideInAnimation} from "./animation-setup.js";

const wait = (delay = 0) =>
    new Promise(resolve => setTimeout(resolve, delay));

const onPageLoaded = () => {
    initializeWindow();
    hideVideoControls();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initializeAnimations()
    initializeCursor()
}

const initializeAnimations = () => {
    initializeLenis()

    wait(500).then(() => {
        $('body').css({
            opacity: 1
        })

        slideInAnimation('.header-line:nth-child(1)', 'left', 4, 'center-=590', 0);
        slideInAnimation('.header-line:nth-child(2)', 'left', 4, 'center-=600', 0.1);
        slideInAnimation('.header-line:nth-child(3)', 'left', 4, 'center-=600', 0.2);

        slideInAnimation('.sharphurt-tags', 'left', 6, 'center-=600', 0);
        slideInAnimation('.arisha-tags', 'left', 6, 'center-=600', 0);

        slideInAnimation('.about-us-container span:nth-child(1)', 'right', 6, 'center-=600', 0.1);
        slideInAnimation('.about-us-container span:nth-child(2)', 'right', 6, 'center-=600', 0.2);

        slideInAnimation('.header-container span:nth-child(1)', 'right', 6, 'center-=800', 0.3);
        slideInAnimation('.header-container span:nth-child(2)', 'right', 6, 'center-=800', 0.35);
        slideInAnimation('.header-container span:nth-child(3)', 'right', 6, 'center-=800', 0.40);

        slideInAnimation('.header-container span:nth-child(3)', 'right', 6, 'center-=800', 0.40);
        slideInAnimation('.header-container span:nth-child(3)', 'right', 6, 'center-=800', 0.40);
        slideInAnimation('.header-container span:nth-child(3)', 'right', 6, 'center-=800', 0.40);


        $('.left-line').animate({
            height: 800
        }, 500)

        $('.right-line').animate({
            height: 800
        }, 500)

        $('.horizontal-line').animate({
            width: 1500
        }, 1000)
    })
}

$(document).ready(() => onPageLoaded())