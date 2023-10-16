import {
    advantagesScrollAnimation,
    GetWindowViewPort,
    initializeLenis, opacityInAnimation,
    reelBlockAnimation,
    slideInAnimation
} from "./animation-setup.js";

(function () {
    window.onload = function () {
        const splineViewerInner = document.querySelector('spline-viewer').shadowRoot;
        initializeWindow();

        // sorry spline(
        hideSplineButton(splineViewerInner);
        scaleToFit(splineViewerInner);
        hideVideoControls();

        initializeAccessoriesController();

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        initializeLenis();
        advantagesScrollAnimation();
        reelBlockAnimation();
        slideInAnimation('.promo-block .large-lines-container span', 'left', 6, 'center-=200', 'center+=100');
        slideInAnimation('.promo-block .desc-text-container span:nth-child(1)', 'right', 6, 'center-=250', 'center');
        slideInAnimation('.promo-block .desc-text-container span:nth-child(2)', 'right', 6, 'center-=150', 'center+=100');

        slideInAnimation('.nav-card', 'bottom', 20, 'bottom bottom', 'center-=100');
        slideInAnimation('.top-content-wrapper', 'bottom', 6, 'center-=250', 'center-=100');
        slideInAnimation('.nav-card-image', 'bottom', 6, 'center-=250', 'center+=100');
        slideInAnimation('.bottom-content-wrapper', 'bottom', 6, 'center-=150', 'center-=50');

        slideInAnimation('.func-header-block .large-lines-container span', 'left', 6, 'center+=350', 'center+=550');
        slideInAnimation('.func-header-block .desc-text-container span', 'right', 6, 'center+=400', 'center+=600');

        slideInAnimation('.features-block div', 'bottom', 20, 'bottom+=300', 'bottom+=500');

        slideInAnimation('.accessories-block-header .large-lines-container span', 'left', 6, 'bottom+=4500', 'bottom+=5000');
        slideInAnimation('.accessories-block-header .desc-text-container', 'right', 6, 'bottom+=4600', 'bottom+=5100');
        // opacityInAnimation('.accessories-block-header .desc-text-container', 'bottom+=4600', 'bottom+=5100');

    }
})();


function initializeWindow() {
    var viewPort = GetWindowViewPort();
    const zoom = viewPort.width / 1440;
    modifyWindowZoom(document.body, zoom);

    let root = document.documentElement;

    root.style.setProperty('--zoom-factor', zoom);
}

function modifyWindowZoom(domElement, percentage) {
    $('spline-viewer').css({
        'transform': `scale(${percentage})`,
        'transform-origin': '0 0',
    })
}

function hideSplineButton(splineInner) {
    splineInner.querySelector('#logo').remove();
}

function scaleToFit(splineInner) {
    splineInner.querySelector('#container').style['transform'] = 'scale(0.5)';
    splineInner.querySelector('#container').style['transform-origin'] = '0 0';
}

function hideVideoControls() {
    const videos = $("video");
    $.each(videos, function () {
        this.controls = false;
    });
}