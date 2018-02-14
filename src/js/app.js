// javascript goes here

const interactiveChartEl = document.querySelector(".header-wrapper");

const svgEl = document.querySelector(".header-panes");

let prevScroll = null;

function checkScroll() {
    // console.log("h2")
    window.requestAnimationFrame(() => {
        const scroll = window.pageYOffset;
        const elHeight = interactiveChartEl.clientHeight;
        if (scroll !== prevScroll) {
            const elOffset = interactiveChartEl.getBoundingClientRect().top + scroll;
            // if (!featureTest('position', 'sticky') && !featureTest('position', '-webkit-sticky')) {
            const offset = interactiveChartEl.getBoundingClientRect().top + scroll;

            if (offset + elHeight - window.innerHeight <= scroll) {
                svgEl.style.position = "absolute";
                svgEl.style.bottom = "0px";
                svgEl.style.top = "auto";
            } else if (offset <= scroll) {
                svgEl.style.position = "fixed";
                svgEl.style.bottom = "";
                svgEl.style.top = "";
            } else {
                svgEl.style.position = "";
            }
        }

        const bbox = interactiveChartEl.getBoundingClientRect();

        prevScroll = scroll;

        doScrollEvent(bbox);
        // }

        checkScroll();
    });
}

function doScrollEvent(bbox) {
    const percentThrough = (bbox.top >= 0) ? 0 : Math.abs(bbox.top) / (bbox.height - window.innerHeight);

    if (percentThrough > 0.5) {
        interactiveChartEl.classList.add("transition");
    } else {
        interactiveChartEl.classList.remove("transition");
    }

}

function featureTest(property, value, noPrefixes) {
    var prop = property + ':',
        el = document.createElement('test'),
        mStyle = el.style;

    if (!noPrefixes) {
        mStyle.cssText = prop + ['-webkit-', '-moz-', '-ms-', '-o-', ''].join(value + ';' + prop) + value + ';';
    } else {
        mStyle.cssText = prop + value;
    }
    return mStyle[property];
}

checkScroll();