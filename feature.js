function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
init()

var cusor = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove", function (dets) {
    cusor.style.left = dets.x + 20 + "px"
    cusor.style.top = dets.y + 20 + "px"

})

var cusor = document.querySelector(".cursor")
var p1v = document.querySelector(".page1 video")
p1v.addEventListener("mouseenter", function (dets) {
    cusor.style.left = dets.x + "px"
    cusor.style.top = dets.y + "px"
    // cusor.style.videoSound="unmuted"

})


var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top 27%",
        end: "top 0%",
        scrub: 2
    }
})


var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top -100%",
        end: "top -120%",
        scrub: 2
    }
})

tl.to(".page1 h1",
    {
        x: -100,

    }, "anim")

tl.to(".page1 h2", {

    x: 100
}, "anim"
)

tl.to(".page1 video", {
    width: "90%"
}, "anim")


tl2.to(".main", {
    backgroundColor: "#fff"
})

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        // markers:true,
        start: "top -300%",
        end: "top -320%",
        scrub: 2
    }
})

tl3.to(".main", {
    backgroundColor: "#0f0d0d"
})


var box = document.querySelectorAll(".box")
box.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        elem.style.backgroundColor = "red"
        var att = elem.getAttribute("data-image")
        cusor.style.width = "300px"
        cusor.style.height = "250px"
        cusor.style.borderRadius = "0%"
        cusor.style.backgroundImage = `url(${att})`

    })

    elem.addEventListener("mouseleave", function () {
        elem.style.backgroundColor = "transparent"
        var att = elem.getAttribute("data-image")
        cusor.style.width = "15px"
        cusor.style.height = "15px"
        cusor.style.borderRadius = "50%"
        cusor.style.backgroundImage = `none`
    })

})

var h4 = document.querySelectorAll(".nav h4")
var purple = document.querySelector(".purple")
h4.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        purple.style.display = "block"
        purple.style.opacity = "1"
    })
    elem.addEventListener("mouseleave", function () {
        purple.style.display = "none"
        purple.style.opacity = "0"
    })
})
