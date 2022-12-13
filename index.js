let svg = document.querySelector('#svg');//acsess the svg element 
let path = document.querySelector('#path');// access the path element
let buttonCircle = document.querySelector('#drawCircle')
let buttonSqure = document.querySelector('#drawSquare');
let buttonPath = document.querySelector('#drawPath');
let buttonDrag = document.querySelector('#dragElement');
let points = document.querySelector('.circleGroup')
// let rectangle = document.querySelector("#rectangle")

let elementStore = [];

let pathflag = 0

let selectedIndex = "";

function buttonClick() {
    alert("draw the path")
    pathflag = 0;
    elementStore = []
    trangleFlag = 1;
    svg.addEventListener('click', function ({ target, x, y }) {

        if (target.id === "circle1") return closepath()

        const { clientWidth, clientHeight } = svg;

        x = Math.round(x / clientWidth * 300)
        y = Math.round(y / clientHeight * 300)

        elementStore.push({ x, y })

        if (pathflag == 0) {
            drawPath();
        }
    })

}

function drawPath() {
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
    pathflag = 1
}

buttonPath.addEventListener('click', buttonClick)

let selecteId;

function movePoints() {
    alert("drag event clicked")
    svg.addEventListener('mousedown', (evt) => {
        const circleId = evt.target.id;
        if (!/circle\d/.test(circleId)) return
        selecteId = circleId.replace('circle', "")

    })
    svg.addEventListener('mousemove', (evt) => {
        if (!(selecteId >= 1)) return
        const actual = {
            x: Math.round((evt.offsetX / svg.clientWidth) * 300),
            y: Math.round((evt.offsetY / svg.clientHeight) * 300)

        }
        elementStore[selecteId - 1] = actual
        drawPath()
    })

    svg.addEventListener('mouseup', () => (selecteId = -1))
}

buttonDrag.addEventListener('click', movePoints);
svg.addEventListener('dblclick', () => {
    pathflag = 1
})

let triangleCordinates = []
let trangleFlag = 0


function drawTriange() {

    alert("triangle button is clicked")
    const rectangle = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
    svg.addEventListener('mousedown', function (e) {

        if (trangleFlag == 0) {

            const actualx = Math.round(e.x / svg.clientWidth * 300);
            const actualy = Math.round(e.y / svg.clientHeight * 300);

            let trianglePoints1 = { x: actualx, y: actualy }

            triangleCordinates.unshift(trianglePoints1);

            rectangle.setAttribute("x", triangleCordinates[0].x)
            rectangle.setAttribute("y", triangleCordinates[0].y)
            rectangle.setAttribute("fill", 'none')
            rectangle.setAttribute('stroke', 'black')
            svg.appendChild(rectangle);

        }

    })

    let mouseFlag = 0;

    svg.addEventListener('mousemove', function (e) {

        if (mouseFlag == 0) {
            const actualx = Math.round(e.x / svg.clientWidth * 300);
            const actualy = Math.round(e.y / svg.clientHeight * 300)

            let trianglePoints1 = { x: actualx, y: actualy }

            triangleCordinates.push(trianglePoints1);

            let rectangleWidth = Math.abs(triangleCordinates[triangleCordinates.length - 1].x - triangleCordinates[0].x)
            let rectangleHeight = Math.abs(triangleCordinates[triangleCordinates.length - 1].y - triangleCordinates[0].y)

            rectangle.setAttribute("width", rectangleWidth)
            rectangle.setAttribute("height", rectangleHeight)
        }
    })
    svg.addEventListener("mouseup", function () {
        mouseFlag = 1;
    })

}

buttonSqure.addEventListener('click', drawTriange)


let circleCordinates = [];
let circleFlag = 0;


function drawCircle() {

    alert("Circle Element click")

    let cir = document.createElementNS("http://www.w3.org/2000/svg", 'circle')


    svg.addEventListener('mousedown', function (e) {

        if(circleFlag==0){

        const actualx = Math.round(e.x / svg.clientWidth * 300);
        const actualy = Math.round(e.y / svg.clientHeight * 300)

        let circlePoints1 = { x: actualx, y: actualy }

        circleCordinates.unshift(circlePoints1)

        cir.setAttribute('cx', circleCordinates[0].x)
        cir.setAttribute('cy', circleCordinates[0].y)
        cir.setAttribute("fill", 'none')
        cir.setAttribute('stroke', 'black')
        svg.appendChild(cir)
        }

    })

    svg.addEventListener('mousemove', function (e) {

        const actualx = Math.round(e.x / svg.clientWidth * 300);
        const actualy = Math.round(e.y / svg.clientHeight * 300)

        let circlePoints2 = { x: actualx, y: actualy }
        circleCordinates.push(circlePoints2)

        let x1 = circleCordinates[0].x
        let y1 = circleCordinates[0].y

        let x2 = circleCordinates[circleCordinates.length - 1].x
        let y2 = circleCordinates[circleCordinates.length - 1].y


        let diameter = Math.floor(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        let radius = diameter / 2;

        if(circleFlag==0){
        cir.setAttribute('r', radius)
        }
    })

    svg.addEventListener('mouseup', function () {

     circleFlag=1;

    })
}


buttonCircle.addEventListener('click', drawCircle)

