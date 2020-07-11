const fs=require('fs')//creamos ficheros

let listadoPorHacer=[];

const guardarDB=()=>{
    //EL ARRAY LO VAMOS A GUARDAR EN UN STRING 
    let data=JSON.stringify(listadoPorHacer)
    //ubicacion, los datos, descripcion si hubo un error
    fs.writeFile('db/data.json',data,(err)=>{if (err) throw new Error('No se pudo grabar',err)});

}
//guardar los datos en un json
const cargarDB=()=>{
    try {
        //guardar los datos
        listadoPorHacer=require('../db/data.json')    
    } catch (error) {
        listadoPorHacer=[]
    }
}
//funcion de flecha que crea la tarea
const crear=(descripcion)=>{
    cargarDB();
    //
    let porHacer={
        descripcion,
        completado:false
    }
    //le agrega algo
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}
//listado por hacer
let getListado=()=>{
    cargarDB();
    return listadoPorHacer;
}

const actualizar=(descripcion,completado=true)=>{
    cargarDB();
    //findIndex:Es un iterador de indices
    let index = listadoPorHacer.findIndex(tarea=>tarea.descripcion===descripcion);//que me de la posicion de la tarea si coincide
    console.log(index);
    if(index>=0){
        listadoPorHacer[index].completado= completado;
        guardarDB();//guardar en la base de datos
        return true;
    }else{
        return false;
    }
}
const borrar=(descripcion)=>{
    cargarDB();
    /*let buscaIndex=listadoPorHacer.findIndex(busca=>busca.descripcion===descripcion)*/
    //Quita un elemento de un json
    let nuevoListado=listadoPorHacer.filter(tarea=>{
        return tarea.descripcion!== descripcion//lo escluye por que es indiferente a la descripcion que le mandamos por parametro
    })
    
    if(listadoPorHacer.length===nuevoListado.length){//muestra si se borri
       //delete listadoPorHacer[buscaIndex]
        //guardarDB();//guardar en la base de datos
        return false;
    }else{
        listadoPorHacer=nuevoListado
        guardarDB();
        return true;
    }
}
module.exports={
    crear,
    getListado,
    actualizar,
    borrar
}