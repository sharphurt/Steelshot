import {
    advantagesScrollAnimation,
    GetWindowViewPort,
    initializeLenis,
    reelBlockAnimation,
    slideInAnimation
} from "./animation-setup.js";

const initializeWindow = () => {
    var viewPort = GetWindowViewPort();
    const zoom = viewPort.width / 1440;
    modifyWindowZoom(document.body, zoom);
    //
    // let root = document.documentElement;
    //
    // root.style.setProperty('--zoom-factor', zoom);
}

const modifyWindowZoom = (domElement, percentage) => {
    $('spline-viewer').css({
        'transform': `scale(${percentage})`,
        'transform-origin': '0 0',
    })
}

const hideSplineButton = (splineInner) => {
    splineInner.querySelector('#logo').remove();
}

const scaleToFit = (splineInner) => {
    splineInner.querySelector('#container').style['transform'] = 'scale(0.5)';
    splineInner.querySelector('#container').style['transform-origin'] = '0 0';
}

const hideVideoControls = () => {
    const videos = $("video");
    $.each(videos, function () {
        this.controls = false;
    });
}

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
    const splineViewerInner = document.querySelector('spline-viewer').shadowRoot;
    initializeWindow();

    // sorry spline(
    hideSplineButton(splineViewerInner);
    scaleToFit(splineViewerInner);
    hideVideoControls();

    initializeAccessoriesController();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initializeAnimations();
}