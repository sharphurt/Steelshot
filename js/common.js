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
        'transform': `scale(${percentage})`, 'transform-origin': '0 0',
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

export let zoom = 1;

export const initializeLenis = () => {
    const lenis = new Lenis({
        lerp: 0.1, infinite: false,
    })

    // new ScrollSnap(lenis, {snapType: ''})

    lenis.on("scroll", ({scroll, limit}) => {
        checkElementsToAnimate()
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

const elementsToAnimate = [{
    element: document.querySelector('.promo-block .large-lines-container span:nth-child(1)'),
    direction: 'left',
    value: 6,
    delay: 0,
    partlyVisible: false
}, {
    element: document.querySelector('.promo-block .large-lines-container span:nth-child(2)'),
    direction: 'left',
    value: 6,
    delay: 0,
    partlyVisible: false
}, {
    element: document.querySelector('.promo-block .large-lines-container span:nth-child(3)'),
    direction: 'left',
    value: 6,
    delay: 0,
    partlyVisible: false
}, {
    element: document.querySelector('.promo-block .desc-text-container span:nth-child(1)'),
    direction: 'right',
    value: 6,
    delay: 0,
    partlyVisible: false
}, //
    {
        element: document.querySelector('.promo-block .desc-text-container span:nth-child(2)'),
        direction: 'right',
        value: 6,
        delay: 0,
        partlyVisible: false
    }, {
        element: document.querySelector('.promo-block .desc-text-container span:nth-child(2)'),
        direction: 'right',
        value: 6,
        delay: 0,
        partlyVisible: false
    }, //
    {
        element: document.querySelector('.nav-card:nth-child(1)'),
        direction: 'bottom',
        value: 6,
        delay: 0,
        partlyVisible: true
    }, {
        element: document.querySelector('.nav-card:nth-child(2)'),
        direction: 'bottom',
        value: 6,
        delay: 0.2,
        partlyVisible: true
    }, //
    {
        element: document.querySelector('.nav-card:nth-child(1) .bottom-content-wrapper'),
        direction: 'bottom',
        value: 6,
        delay: 0,
        partlyVisible: true
    }, {
        element: document.querySelector('.nav-card:nth-child(2) .bottom-content-wrapper'),
        direction: 'bottom',
        value: 6,
        delay: 0.2,
        partlyVisible: true
    }, //
    {
        element: document.querySelector('.nav-card:nth-child(1) img'),
        direction: 'bottom',
        value: 6,
        delay: 0.5,
        partlyVisible: true
    }, {
        element: document.querySelector('.nav-card:nth-child(2) img'),
        direction: 'bottom',
        value: 6,
        delay: 0.7,
        partlyVisible: true
    }, //
    {
        element: document.querySelector('.func-header-block .large-lines-container span:nth-child(1)'),
        direction: 'left',
        value: 6,
        delay: 0,
        partlyVisible: false
    }, {
        element: document.querySelector('.func-header-block .large-lines-container span:nth-child(2)'),
        direction: 'left',
        value: 6,
        delay: 0.2,
        partlyVisible: false
    }, //
    {
        element: document.querySelector('.func-header-block .desc-text-container span'),
        direction: 'right',
        value: 6,
        delay: 0.2,
        partlyVisible: false
    }, //
    {
        element: document.querySelector('.features-block div:nth-child(1)'),
        direction: 'bottom',
        value: 6,
        delay: 0,
        partlyVisible: true
    },
    {
        element: document.querySelector('.features-block div:nth-child(2)'),
        direction: 'bottom',
        value: 6,
        delay: 0,
        partlyVisible: true
    },
    {
        element: document.querySelector('.features-block div:nth-child(3)'),
        direction: 'bottom',
        value: 6,
        delay: 0,
        partlyVisible: true
    },
    {
        element: document.querySelector('.features-block div:nth-child(4)'),
        direction: 'bottom',
        value: 6,
        delay: 0,
        partlyVisible: true
    },
    {
        element: document.querySelector('.features-block div:nth-child(5)'),
        direction: 'bottom',
        value: 6,
        delay: 0,
        partlyVisible: true
    },//
    {
        element: document.querySelector('.accessories-block-header .large-lines-container span:nth-child(1)'),
        direction: 'left',
        value: 6,
        delay: 0,
        partlyVisible: false
    },
    {
        element: document.querySelector('.accessories-block-header .large-lines-container span:nth-child(2)'),
        direction: 'left',
        value: 6,
        delay: 0,
        partlyVisible: false
    },
    {
        element: document.querySelector('.accessories-block-header .large-lines-container span:nth-child(3)'),
        direction: 'left',
        value: 6,
        delay: 0,
        partlyVisible: false
    },
    {
        element: document.querySelector('.accessories-block-header .desc-text-container'),
        direction: 'right',
        value: 6,
        delay: 0,
        partlyVisible: false
    },
    {
        element: document.querySelector('.accessories-block'),
        direction: 'top',
        value: 6,
        delay: 0.2,
        partlyVisible: true
    }
]

export const initializeAnimationInChecker = () => {
    var viewPort = GetWindowViewPort();
    zoom = viewPort.width / 1440;

    elementsToAnimate.filter((el) => el.element != null).forEach((e) => {
        if (e.direction === 'left' || e.direction === 'right') gsap.set(e.element, {
            opacity: 0, xPercent: e.value * ((e.direction === 'left') ? 1 : -1)
        })

        if (e.direction === 'top' || e.direction === 'bottom') gsap.set(e.element, {
            opacity: 0, yPercent: e.value * ((e.direction === 'top') ? -1 : 1)
        })
    })
}

const checkElementsToAnimate = () => {
    elementsToAnimate.filter((el) => el.element != null).forEach((e) => {
        if (elementIsVisibleInViewport(e)) {
            gsap.to(e.element, {
                opacity: 1, xPercent: 0, yPercent: 0, duration: 0.5, delay: e.delay
            })
        }
    })
}

const elementIsVisibleInViewport = (el) => {
    let {top, left, bottom, right} = el.element.getBoundingClientRect();
    const {innerHeight, innerWidth} = window;

    return el.partlyVisible ? ((top * zoom > 0 && top * zoom < innerHeight) || (bottom * zoom > 0 && bottom * zoom < innerHeight)) : top * zoom >= 0 && left * zoom >= 0 && bottom * zoom <= innerHeight && right * zoom <= innerWidth;
};

var cursor = new MouseFollower({
    speed: 0.35,
    iconSvgSrc: 'assets/cursors.svg',
    stateDetection: {
        '-pointer': 'a,button,.nav-card, input, #spline-viewer, .tech-info-header, .footer',
    }
});

export const initializeCursor = () => {
    MouseFollower.registerGSAP(gsap)
    cursor.setIcon('default')

    const pointerCursorTargets = document.querySelectorAll('a, button, .nav-card, input, .footer');
    pointerCursorTargets.forEach((e) => {
        e.addEventListener('mouseover', () => {
            cursor.setIcon('pointer');
        });

        e.addEventListener('mouseleave', () => {
            cursor.setIcon('default')
        });
    })

    const slidingCursorTargets = document.querySelectorAll('#spline-viewer')
    slidingCursorTargets.forEach((e) => {
        e.addEventListener('mouseover', () => {
            cursor.setIcon('slide');
        });

        e.addEventListener('mouseleave', () => {
            cursor.setIcon('default')
        });
    })

    const draggingCursorTargets = document.querySelectorAll('.slider-area')
    draggingCursorTargets.forEach((e) => {
        e.addEventListener('mouseover', () => {
            cursor.setIcon('drag');
        });

        e.addEventListener('mouseleave', () => {
            cursor.setIcon('default')
        });
    })

    const closeCursorTargets = document.querySelectorAll('.reel-close-cover')
    closeCursorTargets.forEach((e) => {
        e.addEventListener('mouseover', () => {
            cursor.setIcon('close')
        });

        e.addEventListener('mouseleave', () => {
            cursor.setIcon('default')
        });
    })
}