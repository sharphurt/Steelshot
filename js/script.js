import {catalogs, loadAllData} from "./accessories/accessories-loader.js";
import {renderCatalog} from "./accessories/accessories-renderer.js";
import {ScrollSnap} from './scroll-snap.js'

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
        initializeAnimations();
    }
})();


function initializeWindow() {
    var viewPort = GetWindowViewPort();
    const zoom = viewPort.width / 1440;
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

const initializeAnimations = () => {
    const photos = gsap.utils.toArray('.advantage-image-container:not(:first-child):not(:last-child)');
    const details = gsap.utils.toArray('.advantage:not(:first-child)');
    const allPhotos = gsap.utils.toArray('.advantage-image-container');
    const photosAnimation = gsap.to(photos, {
        yPercent: 0,
        duration: 0.5,
        stagger: 1
    });




    ///

    const sections = document.querySelectorAll('.advantage-trigger');
    const scrolling = {
        enabled: true,
        events: "scroll,wheel,touchmove,pointermove".split(","),
        prevent: e => e.preventDefault(),
        disable() {
            if (scrolling.enabled) {
                scrolling.enabled = false;
                window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
                scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
            }
        },
        enable() {
            if (!scrolling.enabled) {
                scrolling.enabled = true;
                window.removeEventListener("scroll", gsap.ticker.tick);
                scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
            }
        }
    };


    function goToSection(section, anim, i) {
        if (scrolling.enabled) { // skip if a scroll tween is in progress
            scrolling.disable();
            gsap.to(window, {
                scrollTo: {y: section, autoKill: false},
                onComplete: scrolling.enable,
                duration: 0.5
            });

            anim && anim.restart();
        }
    }

    // gsap.set(sections, {
    //     opacity: 0,
    //     yPercent: 50,
    // })
    //
    // sections.forEach((section, i) => {
    //     const intoAnim = gsap.to(section, {
    //         opacity: 1,
    //         yPercent: 0,
    //         duration: 0.5
    //     });
    //
    //     ScrollTrigger.create({
    //         trigger: section,
    //         animation: intoAnim,
    //     });
    // });


    ///

    ScrollTrigger.create({
        trigger: '.advantages-block',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.image-section',
        animation: photosAnimation,
        scrub: true
    });

    $('.advantage-image-container').each(function (i, obj) {
        if (i !== 5)
            $(obj).css({
                'z-index': `${(6 - i) * 100000}`
            })
    })

    $('.advantage-image-container ing').each(function (i, obj) {
        if (i !== 4 && i !== 5)
            $(obj).css({
                'box-shadow': 'box-shadow: -3px 11px 25px 0px rgba(0, 0, 0, 0.29), -11px 44px 46px 0px rgba(0, 0, 0, 0.26), -24px 100px 61px 0px rgba(0, 0, 0, 0.15), -42px 177px 73px 0px rgba(0, 0, 0, 0.04), -66px 277px 80px 0px rgba(0, 0, 0, 0.01);'
            })
    })

    details.forEach((detail, index) => {
        let headline = detail.querySelector('.advantage-trigger');
        let enterAnimation = gsap.timeline()
            .to(allPhotos[index], {
                opacity: 0,
                xPercent: -10,
            })

        ScrollTrigger.create({
            trigger: headline,
            start: 'top 80%',
            end: 'top 20%',
            animation: enterAnimation,
            scrub: true,
            markers: false
        })
    });

    gsap.set(allPhotos[0], {opacity: 1, xPercent: 0});
    gsap.set(allPhotos[5], {opacity: 0, yPercent: 10});

    let lastAnimation = gsap.timeline()
        .to(allPhotos[5], {
            opacity: 1,
            yPercent: 0
        })

    ScrollTrigger.create({
        trigger: details[4].querySelector('.advantage-trigger'),
        start: 'top 80%',
        end: 'top 20%',
        animation: lastAnimation,
        scrub: true,
        markers: false
    })
}


const initializeLenis = () => {
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
