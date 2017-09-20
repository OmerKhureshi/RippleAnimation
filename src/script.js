function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getViewPortDims() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

    var vpWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    var vpHeight = w.innerHeight || e.clientHeight || g.clientHeight;

    return {
        width: vpWidth,
        height: vpHeight
    };
}

function getRandomCords() {
    var xPos = Math.random() * getViewPortDims().width;
    var yPos = Math.random() * getViewPortDims().height;

    return {
        xPos: xPos,
        yPos: yPos
    };
}

function setStartProps(ele, xPos, yPos) {
    var eleWidth = 200;
    var eleHeight = 200;

    ele.style.width = eleWidth + "px";
    ele.style.height = eleHeight + "px";
    ele.style.borderRadius = '100%';

    ele.style.position = 'absolute';

    ele.style.top = (yPos - eleHeight / 2) + "px";
    ele.style.left = (xPos - eleWidth / 2) + "px";

    console.log((yPos - eleHeight / 2) + "px");
    console.log((xPos - eleWidth / 2) + "px");

    ele.style.background = getRandomColor();
    ele.style.transition = "all .75s cubic-bezier(.35, .42, .61, .69)";
}

function setEndProps(ele) {
    var val = Math.max(getViewPortDims().width, getViewPortDims().height);
    var scale = Math.random() * (val / 50);
    ele.style.transform = "scale(" + scale + ")";
}

function createEle() {
    var circleEle = document.createElement("div");
    circleEle.setAttribute('class', 'circle');
    return circleEle;
}


function addExpandingElement(event) {
    // Set the number of circles.
    var numOfCircles = 10;

    var containerEle = document.getElementsByClassName('container')[0];
    var circleArr = [];

    for (var i = 0; i < numOfCircles; i++) {
        var circleEle = createEle();
        containerEle.appendChild(circleEle);
        setStartProps(circleEle, event.clientX, event.clientY);
        circleArr.push(circleEle);
    }

    for (var i = 0; i < numOfCircles; i++) {
        (function (ind) {
            setTimeout(function () {
                setEndProps(circleArr[ind]);
            }, ind * 200);
        })(i);
    }
}

window.onload = function () {
    document.addEventListener("click", addExpandingElement);
};
