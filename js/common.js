import {GetWindowViewPort} from "./animation-setup.js";
import {ScrollSnap} from "./scroll-snap.js";

export const initializeWindow = () => {
    var viewPort = GetWindowViewPort();
    const zoom = viewPort.width / 1440;
    modifyWindowZoom(zoom);
}

export const modifyWindowZoom = (percentage) => {
    let root = document.documentElement;
    root.style.setProperty('--zoom-factor', percentage);

    $('spline-viewer').css({
        'transform': `scale(${percentage})`,
        'transform-origin': '0 0',
    })
}

export const hideSplineButton = (splineInner) => {
     splineInner.querySelector('#logo').remove();
}

export const scaleToFit = (splineInner) => {
    splineInner.querySelector('#container').style['transform'] = 'scale(0.5)';
    splineInner.querySelector('#container').style['transform-origin'] = '0 0';
}

export const hideVideoControls = () => {
    const videos = $("video");
    $.each(videos, function () {
        this.controls = false;
    });
}

export const initializeLenis = () => {
    const lenis = new Lenis({
        lerp: 0.1,
        infinite: false,
    })

    new ScrollSnap(lenis, {snapType: ''})

    lenis.on("scroll", ({scroll, limit}) => {
        //   console.log({scroll, limit});
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}
