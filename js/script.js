import {catalogs, loadAllData} from "./accessories/accessories-loader.js";
import {renderCatalog} from "./accessories/accessories-renderer.js";
import {advantagesScrollAnimation, GetWindowViewPort, initializeLenis, reelBlockAnimation} from "./animation-setup.js";


(function () {
    window.onload = function () {
        const splineViewerInner = document.querySelector('spline-viewer').shadowRoot;
        initializeWindow();

        // sorry spline(
        hideSplineButton(splineViewerInner);
        scaleToFit(splineViewerInner);
        hideVideoControls();

        const catalogContainer = $('.slider-area')

        loadAllData(['lenses', 'bags', 'stands', 'batteries'], function () {
            console.log(catalogs)
            renderCatalog(catalogs['lenses'], catalogContainer);
        })

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        initializeLenis();
        advantagesScrollAnimation();
        reelBlockAnimation();
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