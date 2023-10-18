import {
    advantagesScrollAnimation,
    GetWindowViewPort,
    reelBlockAnimation,
    slideInAnimation
} from "./animation-setup.js";
import {
    hideSplineButton,
    hideVideoControls,
    initializeLenis,
    initializeWindow,
    scaleToFit
} from "./common.js";

const initializeAnimations = () => {
    initializeLenis();
    advantagesScrollAnimation();
    reelBlockAnimation();
    slideInAnimation('.promo-block .large-lines-container span:nth-child(1)', 'left', 6, 'center-=590', 0);
    slideInAnimation('.promo-block .large-lines-container span:nth-child(2)', 'left', 6, 'center-=600', 0.1);
    slideInAnimation('.promo-block .large-lines-container span:nth-child(3)', 'left', 6, 'center-=610', 0.2);

    slideInAnimation('.promo-block .desc-text-container span:nth-child(1)', 'right', 6, 'center-=620', 0.1);
    slideInAnimation('.promo-block .desc-text-container span:nth-child(2)', 'right', 6, 'center-=620', 0.2);

    slideInAnimation('.nav-card', 'bottom', 20, 'top-=500', 0);
    slideInAnimation('.top-content-wrapper', 'bottom', 6, 'top-=500', 0);
    slideInAnimation('.nav-card-image', 'bottom', 6, 'top-=500', 'center+=100');
    slideInAnimation('.bottom-content-wrapper', 'bottom', 6, 'top-=500', 'center-=50');

    slideInAnimation('.func-header-block .large-lines-container span', 'left', 6, 'center-=300', 0);
    slideInAnimation('.func-header-block .desc-text-container span', 'right', 6, 'center-=300', 0);

    slideInAnimation('.features-block div', 'bottom', 20, 'bottom+=50', 0);

    slideInAnimation('.accessories-block-header .large-lines-container span', 'left', 6, 'bottom+=4150', 0);
    slideInAnimation('.accessories-block-header .desc-text-container', 'right', 6, 'bottom+=4200', 0);
    // opacityInAnimation('.accessories-block-header .desc-text-container', 'bottom+=4600', 'bottom+=5100');
}

export const onPageLoaded = () => {
    console.log("dsd")

    const splineViewerInner = document.querySelector('#spline-viewer').shadowRoot;
    initializeWindow();

    // sorry spline(
    hideSplineButton(splineViewerInner);
    scaleToFit(splineViewerInner);
    hideVideoControls();

    initializeAccessoriesController();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initializeAnimations();
}