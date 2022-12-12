let svg = document.querySelector('#svg');//acsess the svg element 
let path = document.querySelector('#path');// access the path element
let buttonCircle = document.querySelector('#drawCircle')//access the button element
let buttonSqure = document.querySelector('#drawSquare');
let buttonPath = document.querySelector('#drawPath');
let buttonDrag = document.querySelector('#dragElement');

let elementStore = [];

function buttonClick() {

    svg.addEventListener('click', function ({ target, x, y }) {

        const { clientWidth, clientHeight } = svg;

        x = Math.round(x / clientWidth * 300)
        y = Math.round(y / clientHeight * 300)

        elementStore.push({ x, y })
        draw();

    })

}

function draw() {
    let d = '';
    elementStore.forEach((p, i) => {
        d += i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`;

        path.setAttribute('d', d)
    });
}


buttonPath.addEventListener('click', buttonClick)