import {ScrollSnap} from "./scroll-snap.js";

export const advantagesScrollAnimation = () => {
    const photos = gsap.utils.toArray('.advantage-image-container:not(:first-child):not(:last-child)');
    const details = gsap.utils.toArray('.advantage:not(:first-child)');
    const allPhotos = gsap.utils.toArray('.advantage-image-container');
    const photosAnimation = gsap.to(photos, {
        yPercent: 0,
        duration: 0.5,
        stagger: 1
    });

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

    $('.advantage-image-container img').each(function (i, obj) {
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

export function GetWindowViewPort() {
    return {
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    };
}

export const reelBlockAnimation = () => {
    var viewPort = GetWindowViewPort();
    const zoom = viewPort.width / 1440;

    gsap.set('.reel-block', {
        paddingLeft: 16 * zoom,
        paddingRight: 16 * zoom
    });

    gsap.set('.reel-video', {
        borderRadius: 16 * zoom
    });

    ScrollTrigger.create({
        trigger: '.reel-block',
        pin: true,
        scrub: true,
        start: "top top",
        end: "bottom+=2000",
        //  markers: true,
        onUpdate: (self) => {
            gsap.to('.reel-progress-thumb', {
                'height': `${self.progress * 100}%`,
                duration: 0.1
            })
        },

        onEnter: () => {
            gsap.to('.reel-block', {
                paddingLeft: 0,
                paddingRight: 0,
                duration: 0.4
            });
            gsap.to('.reel-video', {
                borderRadius: 0,
                duration: 0.4
            })
        },
        onLeave: () => {
            gsap.from('.reel-block', {
                paddingLeft: 0,
                paddingRight: 0,
                duration: 0.4
            });
            gsap.to('.reel-video', {
                borderRadius: 16 * zoom,
                duration: 0.4
            });
        },
        onEnterBack: () => {
            gsap.to('.reel-block', {
                paddingLeft: 0,
                paddingRight: 0,
                duration: 0.4
            });
            gsap.to('.reel-video', {
                borderRadius: 0,
                duration: 0.4
            })
        },
        onLeaveBack: () => {
            gsap.from('.reel-block', {
                paddingLeft: 0,
                paddingRight: 0,
                duration: 0.4
            });
            gsap.to('.reel-video', {
                borderRadius: 16 * zoom,
                duration: 0.4
            })
        }
    });
}

export const slideInAnimation = (elementsSelector, direction, value, start, end) => {
    const elements = gsap.utils.toArray(`${elementsSelector}`);

    elements.forEach((element) => {
        if (direction === 'left' || direction === 'right')
            gsap.set(element, {
                opacity: 0,
                xPercent: value * ((direction === 'left') ? 1 : -1)
            })

        if (direction === 'top' || direction === 'bottom')
            gsap.set(element, {
                opacity: 0,
                yPercent: value * ((direction === 'top') ? -1 : 1)
            })

        let enterAnimation = gsap.timeline()
            .to(element, {
                opacity: 1,
                xPercent: 0,
                yPercent: 0
            })

        ScrollTrigger.create({
            trigger: element,
            start: start,
            end: end,
            animation: enterAnimation,
            scrub: true,
            markers: false
        })
    })
}

export const opacityInAnimation = (elementsSelector, start, end) => {
    const elements = gsap.utils.toArray(`${elementsSelector}`);

    elements.forEach((eleemnt, index) => {
        gsap.set(eleemnt, {
            opacity: 0,
        })

        let enterAnimation = gsap.timeline()
            .to(eleemnt, {
                opacity: 1,
            })

        ScrollTrigger.create({
            trigger: eleemnt,
            start: start,
            end: end,
            animation: enterAnimation,
            scrub: true,
            markers: false
        })
    })
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
