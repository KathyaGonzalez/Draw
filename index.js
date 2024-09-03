const pizarra = document.getElementById("pizarra");
const limpiarBtn = document.getElementById("limpiar");
const grosorLapiz = document.getElementById("grosorLapiz");
const colorLapiz = document.getElementById("colorLapiz");
const descargarBtn = document.getElementById("descargarBtn");
const circuloBtn = document.getElementById("circulo")
const context = pizarra.getContext("2d");


let initialX;
let initialY;
let figura=0;
const dibujar = (cursorX, cursorY) =>{
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = grosorLapiz.value;
    context.strokeStyle = colorLapiz.value;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(cursorX, cursorY);
    context.stroke();
    initialX = cursorX;
    initialY = cursorY;
}

const mouseDown = (event) => {
    initialX = event.offsetX;
    initialY = event.offsetY;
    dibujar(initialX, initialY);
    pizarra.addEventListener("mousemove", mouseMoving);
}

const mouseMoving = (event) => {
    dibujar(event.offsetX, event.offsetY);
}

const mouseUp = () => {
    pizarra.removeEventListener("mousemove", mouseMoving)
}

/*colorLapiz.addEventListener("change", () => {
    grosorLapiz.style.accentColor= colorLapiz.value;
})*/

pizarra.addEventListener("mousedown", mouseDown);
pizarra.addEventListener("mouseup", mouseUp);

limpiarBtn.addEventListener("click", () => {context.clearRect(0, 0, pizarra.width, pizarra.height)});

descargarBtn.addEventListener("click", () => {
    //Quitar fondo negro
    var imgData=context.getImageData(0,0,pizarra.width,pizarra.height);
    var data=imgData.data;
    for(var i=0;i<data.length;i+=4){
        if(data[i+3]<255){
            data[i]=255;
            data[i+1]=255;
            data[i+2]=255;
            data[i+3]=255;
        }
    }
    context.putImageData(imgData,0,0);
    //Descargar imagen
    let link = document.createElement('a');
    link.download = "Imagen.png";
    link.href = pizarra.toDataURL();
    link.click();
});
