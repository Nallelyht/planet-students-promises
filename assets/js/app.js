var plantilla = '<div class="row">'+
		'<div class="col s12 m7">'+
		'<h2 class="header">__nombre__</h2>'+
		'<div class="card horizontal">'+
		'<div class="card-image">'+
		'<img src="static/img/planets.jpg">'+
		'</div>'+
		'<div class="card-stacked">'+
		'<div class="card-content">'+
		'<p>__den__ density</p>' +
		'<p>Discovered in __disc__ with __telescopio__</p>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'</div>'+
		'</div>';

var plantillaFinal = " ";
var crearTarjeta = function(resultado){
	var nombre = resultado.pl_name;
	var densidad = resultado.dec;
	var descubrimiento = resultado.pl_disc;
	var telescopio = resultado.pl_telescope;  


	console.log(nombre,densidad,descubrimiento,telescopio);

	plantillaFinal += plantilla.replace('__nombre__', nombre)
		.replace('__den__', densidad).replace('__disc__', descubrimiento)
		.replace('__telescopio__', telescopio);		

	document.getElementById("cards-container").innerHTML = plantillaFinal;
};


function getJSON(url){
	return new Promise(function(resolve,reject){
		var ajax = new XMLHttpRequest();  
		ajax.open("GET", url); 
		ajax.send(); 
		ajax.onreadystatechange = function(){ 
			if(ajax.readyState == 4){ 
				resolve(JSON.parse(ajax.responseText)); 
			} else{
				reject("No hay planetas");
			}
		}
	})
};
/*var planetas;
fetch("data/earth-like-results.json")
	.then(response => response.json())
	.then((json)=> {
	planetas=json;
	return fetch(
		planetas.results.map(getJSON));

}).then((json)=>{

	resultados.forEach(crearTarjeta);

})
	.catch(function(error){
	console.log(error)
});*/
getJSON("data/earth-like-results.json") 
	.then(function(response){
	return Promise.all(
		response.results.map(getJSON));

}).then(function(resultados){

	resultados.forEach(crearTarjeta);

})
	.catch(function(error){
	console.log(error)
});



//  .then(function(mensaje){return(getJSON(mensaje.results[0]))}) 
//  .then(function(resultado){console.log(resultado.pl_name)});