import {catalogs, loadAllData} from "./accessories/accessories-loader.js";
import {renderCatalog} from "./accessories/accessories-renderer.js";


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

    gsap.registerPlugin(ScrollTrigger);
    initializeLenis();
    initializeAnimations();
}


function initializeWindow() {
    var viewPort = GetWindowViewPort();
    const zoom = viewPort.width / 1440;
    if (viewPort.width > 1400 && viewPort.height > 700)
        modifyWindowZoom(document.body, zoom);

    let root = document.documentElement;

    root.style.setProperty('--zoom-factor', zoom);
}

function GetWindowViewPort() {
    return {
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    };
}

function modifyWindowZoom(domElement, percentage) {
    $('body section:not(.advantages-block)').css({
        'zoom': percentage,
    })

    $('spline-viewer').css({
        'transform': `scale(${percentage})`,
        'transform-origin': '0 0',
    })

    $('.advantage-header').css({
        'zoom': percentage,
        //'transform-origin': '0 0'
    })

    $('.advantage-trigger > span').css({
        'zoom': percentage,
        //'transform-origin': '0 0'
    })

    $('.advantages-lead-container span').css({
        'zoom': percentage,
        //'transform-origin': '0 0'
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

const initializeAnimations = () => {
    const photos = gsap.utils.toArray('.advantage-image-container:not(:first-child)');
    const details = gsap.utils.toArray('.advantage:not(:first-child)');

    gsap.set(photos, {opacity: 0, scale: 1.4});

    const allPhotos = gsap.utils.toArray('.advantage-image-container');

    const textAnimation = gsap.to(photos, {
        yPercent: 0,
        duration: 0.5,
        stagger: 1
    });

    ScrollTrigger.create({
        trigger: '.advantages-block',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.image-section',
        animation: textAnimation,
        scrub: true
    });

    details.forEach((detail, index) => {
        let headline = detail.querySelector('.advantage-trigger');
        let enterAnimation = gsap.timeline()
            .to(photos[index], {opacity: 1, scale: 1})
            .to(allPhotos[index], {opacity: 0, scale: 0.6})

        ScrollTrigger.create({
            trigger: headline,
            start: 'top 70%',
            end: 'top 30%',
            animation: enterAnimation,
            scrub: true,
            markers: false
        })
    });

    gsap.set(allPhotos[0], {opacity: 1, scale: 1});
}


const initializeLenis = () => {
    const lenis = new Lenis({
        lerp: 0.1,
        infinite: false,
    })

    lenis.on("scroll", ({scroll, limit}) => {
        //  console.log("onScroll", ScrollTrigger.getAll());
        console.log({scroll, limit});
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}
