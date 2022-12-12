let svg = document.querySelector('#svg');//acsess the svg element 
let path = document.querySelector('#path');// access the path element
let buttonCircle = document.querySelector('#drawCircle')//access the button element
let buttonSqure = document.querySelector('#drawSquare');
let buttonPath = document.querySelector('#drawPath');
let buttonDrag = document.querySelector('#dragElement');
let points = document.querySelector('.circleGroup')

let elementStore = [];

function buttonClick() {

    svg.addEventListener('click', function ({ target, x, y }) {

        if (target.id === "circle1") return closepath()

        const { clientWidth, clientHeight } = svg;

        x = Math.round(x / clientWidth * 300)
        y = Math.round(y / clientHeight * 300)

        elementStore.push({ x, y })
        draw();

    })

}

function draw() {
    let d = '';
    points.innerHTML = "";
    elementStore.forEach((p, i) => {
        d += i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`;

        drawcircle(p, i)
        path.setAttribute('d', d)
    });
}

function drawcircle({ x, y }, index) {
    let check = index === elementStore.length - 1;
    let link = "http://www.w3.org/2000/svg"
    const c = document.createElementNS(link, 'circle')
    c.setAttribute("cx", x)
    c.setAttribute("cy", y)
    c.setAttribute("r", 1)
    c.classList.add("color")
    c.setAttribute("id", `circle${index + 1}`)
    if (check) c.classList.add("color1")
    points.appendChild(c)
}

function closepath() {
    let d = path.getAttribute("d")
    d += ` Z`
    path.setAttribute("d", d)
    const lastcircle = document.querySelector(`#circle${elementStore.length}`)
    lastcircle.style.fill = "transparent"
    lastcircle.style.stroke = "none"
}

buttonPath.addEventListener('click', buttonClick)