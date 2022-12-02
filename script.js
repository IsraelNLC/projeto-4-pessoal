const canvas = document.getElementById("trackingMap");
const ctx = canvas.getContext("2d");
const inputDiv = document.getElementById("inputdata");
var distancia1 = 1;
var distancia2 = 2;
var distancia3 = 3;


let xTamanho = canvas.width;
let yTamanho = canvas.height;
let xMetade = xTamanho/2;
let yMetade = yTamanho/2;
let radius = 5;
let ladoRetanguloX = xTamanho/30
let ladoRetanguloY = yTamanho/20



function drawTag(xFun, yFun, radiusFun){
    ctx.beginPath();
    ctx.arc(xFun, yFun, radiusFun, 0, Math.PI*2, false);
    ctx.fillStyle = "#17a2b8";
    ctx.fill();
    ctx.closePath();
}

function quadradoAzul(xBeg,yBeg,wid,hei){
    ctx.beginPath();
    ctx.rect(xBeg,yBeg,wid,hei);
    ctx.fillStyle = "#007bff";
    ctx.fill();
}

function draw(){
    get_data();
    // input into html
    inputDiv.innerHTML = "Distancia 1: " + distancia1 + " Distancia 2: " + distancia2 + " Distancia 3: " + distancia3;
    var sensor1 = yTamanho/15 * distancia1 + 10;
    var sensor2 = yTamanho/10 * distancia2 + 300;
    var sensor3 = yTamanho/20 * distancia3 + 200;

    // var sensor1 = Math.sqrt((xTamanho**2 + yTamanho**2)/4);
    // var sensor2 = Math.sqrt((xTamanho**2 + yTamanho**2)/4);
    // var sensor3 = Math.sqrt((xTamanho**2 + yTamanho**2)/4);
    var x = (sensor3**2 - sensor1**2 - xTamanho**2)/(-2*xTamanho);
    var y = (sensor2**2 - sensor1**2 - yTamanho**2)/(-2*yTamanho);
    ctx.clearRect(0, 0, xMetade, yMetade);
    drawTag(x,y,radius);
    quadradoAzul(0,0,ladoRetanguloX,ladoRetanguloY);
    quadradoAzul(0,yTamanho-ladoRetanguloY,ladoRetanguloX,ladoRetanguloY);
    quadradoAzul(xTamanho-ladoRetanguloX,0,ladoRetanguloX,ladoRetanguloY);
}

setInterval(draw, 100);

function change_url(state){
    history.pushState({}, null, state);
}

function direcionar_url(){
    var url = window.location.href;
    var room = $("#rooms option:selected").val();
    var tag = $("#tags option:selected").val();
    window.location = url + "/" + room + "/" + tag;
}

function alerta(){
    window.location.reload();
    document.getElementById("alert").style.display = "block";
}

function home_page(){
    document.getElementById("alert").style.display = "block";
}

function close_alert(){
    document.getElementById("alert").style.display = "none";
    window.location.href = "home";
}
// get asyncronous data from node

function get_data(){
    let url = "http://127.0.0.1:4010/getdistances"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            distancia1 = data.dist1;
            distancia2 = data.dist2;
            distancia3 = data.dist3;
        }

    }
    xhttp.open("GET", url, true);
    xhttp.send();
    }
