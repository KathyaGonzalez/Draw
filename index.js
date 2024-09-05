const pizarra = document.getElementById("pizarra");
const limpiarBtn = document.getElementById("limpiar");
const grosorLapiz = document.getElementById("grosorLapiz");
const colorLapiz = document.getElementById("colorLapiz");
const descargarBtn = document.getElementById("descargarBtn");
const context = pizarra.getContext("2d");
const borrador = document.getElementById("borrador");
const cuadradoBtn = document.getElementById('cuadrado');
const lapizBtn = document.getElementById('lapiz');
const circuloBtn = document.getElementById("circulo");



let initialX;
let initialY;
let util='lapiz';
let figura='garabatear';
const dibujar = (cursorX, cursorY) =>{
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = grosorLapiz.value;
    if (util==='lapiz'){
        context.strokeStyle = colorLapiz.value;
    }else{
        context.strokeStyle = 'white';
    }
    context.lineTo(cursorX, cursorY);
    context.stroke();
    context.lineCap = "round";
    context.lineJoin = "round";
    initialX = cursorX;
    initialY = cursorY;
}

const mouseDown = (event) => {
    initialX = event.offsetX;
    initialY = event.offsetY;
    if(figura==='garabatear'){
        dibujar(initialX, initialY);
        pizarra.addEventListener("mousemove", mouseMoving);
    }
}

const mouseMoving = (event) => {
    if(figura==='garabatear'){
        dibujar(event.offsetX, event.offsetY);
    }
}

const mouseUp = (event) => {
    if(figura==='garabatear'){
        pizarra.removeEventListener("mousemove", mouseMoving)
    }else if (figura==='cuadrado'){
        let ancho = Math.abs(initialX-event.offsetX);
        let altura = Math.abs(initialY-event.offsetY);
        context.beginPath();
        context.moveTo(initialX, initialY);
        context.lineWidth = grosorLapiz.value;
        context.strokeStyle = colorLapiz.value;        
        if(initialX>event.offsetX){
            initialX=initialX-ancho;
        }
        if(initialY>event.offsetY){
            initialY=initialY-altura;
        }
        context.strokeRect(initialX, initialY, ancho, altura);
    }
}

/*colorLapiz.addEventListener("change", () => {
    grosorLapiz.style.accentColor= colorLapiz.value;
})*/

pizarra.addEventListener("mousedown", mouseDown);
pizarra.addEventListener("mouseup", mouseUp);

limpiarBtn.addEventListener("click", () => {context.clearRect(0, 0, pizarra.width, pizarra.height)});

//Borrador 
borrador.addEventListener("click", () => {
    util='borrador';
    figura='garabatear';
});

colorLapiz.addEventListener("click", () => {
    util='lapiz';
});

//Dibujar cuadrado
cuadradoBtn.addEventListener("click", () => {
    figura = 'cuadrado';
})

//Dibujar con lapiz
lapizBtn.addEventListener("click", () => {
    figura = 'garabatear';
    util = 'lapiz';
})

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
