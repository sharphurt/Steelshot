import {catalogs, loadAllData} from "./accessories/accessories-loader.js";
import {renderCatalog} from "./accessories/accessories-renderer.js";

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

    }

    function initializeWindow() {
        var viewPort = GetWindowViewPort();
        const zoom = viewPort.width / 1440;
        if (viewPort.width > 1400 && viewPort.height > 700)
            modifyWindowZoom(document.body, zoom);

        let root = document.documentElement;

        root.style.setProperty('--zoom-factor',zoom);
    }

    function GetWindowViewPort() {
        return {
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        };
    }

    function modifyWindowZoom(domElement, percentage) {
        domElement.style['transform'] = 'scale(' + percentage + ')';
        domElement.style['transform-origin'] = '0 0';

        //domElement.style["zoom"] = percentage;
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
})();
