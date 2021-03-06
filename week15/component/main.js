import { createElement, Text, Wrapper } from './createElement';
import { Timeline, Animation } from './animation.js'
import { cubicBezier } from "./cubicBezier.js";

let ease = cubicBezier(.25, .1, .25, 1);
const duration = 3000;

class Carousel {
    constructor() { // config
        this.children = []
    }
    setAttribute(name, value) { // attribute
        this[name] = value
    }

    render() {
        let children = this.data.map(url => {
            let element = <img src={url}/>
            element.addEventListener('dragstart', event => event.preventDefault())
            return element
        })
        let root = <div class="carousel">{children}</div>;
        let position = 0;

        let tl = new Timeline()
        tl.start()
        // let nextPic = () => {
        //     let nextPosition = (position + 1) % this.data.length;
        //     let current = children[position];
        //     let next = children[nextPosition];

        //     tl.add(new Animation({
        //       object: current.style, porperty: "transform", start: - 100 * position, end: - 100 -100 * position, duration: 1000, timingFunction: ease,
        //       template: v => `translateX(${v}%)`,
        //     }));

        //     tl.add(new Animation({
        //       object: next.style, porperty: "transform", start: 100 -100 * nextPosition, end: - 100 * nextPosition, duration: 1000, timingFunction: ease,
        //       template: v => `translateX(${v}%)`,
        //     }));
        //     position = nextPosition
           
        //     setTimeout(nextPic, 3000);
        // }
        // setTimeout(nextPic, 3000);
        root.addEventListener("mousedown", event => {
            let startX = event.clientX, startY = event.clientY;
            let nextPosition = (position + 1) % this.data.length;
            let lastPosition = (position - 1 + this.data.length) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];
            let last = children[lastPosition];

            current.style.transition = "ease 0s";
            next.style.transition = "ease 0s";
            last.style.transition = "ease 0s";

            current.style.transform = `translateX(${- 500 * position}px)`;
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
            last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;

            let c = 0;
            let n = 0;
            let l = 0;
            let move = event => {
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
                c = event.clientX - startX - 500 * position;
                n = event.clientX - startX + 500 - 500 * nextPosition;
                l = event.clientX - startX - 500 - 500 * lastPosition;
            };

            let up = event => {
                let offset = 0;

                if (event.clientX - startX > 250) {
                    offset = 1;
                } else if (event.clientX - startX < - 250) {
                    offset = - 1;
                }
                tl.add(new Animation({
                  object: current.style, porperty: "transform", start: c, end: offset * 500 - 500 * position, duration: 1000, timingFunction: ease,
                  template: v => `translateX(${v}px)`,
                }));
                tl.add(new Animation({
                  object: next.style, porperty: "transform", start: n, end: offset * 500 + 500 - 500 * nextPosition, duration: 1000, timingFunction: ease,
                  template: v => `translateX(${v}px)`,
                }));
                tl.add(new Animation({
                  object: last.style, porperty: "transform", start: l, end: offset * 500 - 500 - 500 * lastPosition, duration: 1000, timingFunction: ease,
                  template: v => `translateX(${v}px)`,
                }));

                position = (position - offset + this.data.length) % this.data.length
                document.removeEventListener("mousemove", move)
                document.removeEventListener("mouseup", up)
            };
            document.addEventListener("mousemove", move)
            document.addEventListener("mouseup", up)

        })

        return root;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}

let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}>
</Carousel>

component.mountTo(document.body)
