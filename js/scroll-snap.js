// https://blog.logrocket.com/style-scroll-snap-points-css/
// https://codepen.io/alsacreations/pen/GaebzJ
// snap/onSnapComplete https://greensock.com/docs/v3/Plugins/ScrollTrigger
export class ScrollSnap {
    constructor(lenis, {snapType}) {
        this.lenis = lenis
        this.isHorizontal = this.lenis.direction === 'horizontal' // we can set different value in case we need snap for different axis.
        this.rootElement = document.body
        this.snapType = snapType

        this.maxVelocity = 0


        this.initElements()
        lenis.on('scroll', this.onScroll)
    }

    initElements() {
        this.elements = Array.from(
            document.body.querySelectorAll(
                '.scroll-snap-align:not([scroll-snap-align="none"])'
            )
        ).map((element, index) => {
            let snapAlign = element.getAttribute('scroll-snap-align')
            if (!['start', 'center', 'end', 'none'].includes(snapAlign)) {
                snapAlign = 'start' // default value: start
            }

            // let snapStop = element.getAttribute('scroll-snap-stop')
            // if (!['normal', 'always'].includes(snapAlign)) {
            //   snapStop = 'normal' // default value: start
            // }

            return {
                element,
                snapAlign,
                index
                // snapStop,
            }
        })

        console.log(this.elements)
    }

    map = (value, in_min, in_max, out_min, out_max) => {
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    onScroll = ({velocity}) => {
        if (Math.abs(velocity) > this.maxVelocity)
            this.maxVelocity = Math.abs(velocity)

        if (Math.abs(velocity) > this.maxVelocity / 3)
            return

        const wrapperRect =
            {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            }
        const wrapperPos = this.isHorizontal ? wrapperRect.left : wrapperRect.top

        // find the closest element according to the scroll position
        const elements = this.elements
            .map(({element, snapAlign, index}) => {
                const elRect = element.getBoundingClientRect()

                let offset = 0
                if ('end' === snapAlign) {
                    offset = this.isHorizontal
                        ? elRect.width - wrapperRect.width
                        : elRect.height - wrapperRect.height
                } else if ('center' === snapAlign) {
                    offset = this.isHorizontal
                        ? (elRect.width - wrapperRect.width) / 2
                        : (elRect.height - wrapperRect.height) / 2
                }

                const elPos = this.isHorizontal ? elRect.left : elRect.top

                const distance = Math.abs(elPos - wrapperPos + offset)
                return {element, distance, elRect, offset, index}
            })
            .sort((a, b) => a.distance - b.distance)

        let limit = this.isHorizontal ? wrapperRect.width : wrapperRect.height
        limit *= 0.4 // proximity is 30%

        //limit *= this.map(Math.abs(velocity), 0, this.maxVelocity / 3, 1, 0)


        const element = elements[0]

        if (element.distance >= limit || element.distance < 1) {
            this.maxVelocity = 0
            return
        }

        if (element.index === 0 && velocity < 0)
            return;

        if (element.index === 5 && velocity > 0)
            return;

        this.lenis.scrollTo(element.element, {
            offset: element.offset,
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
    }
}