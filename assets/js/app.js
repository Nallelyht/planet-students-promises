var plantilla = '<div class="row">' +
		'<div class="col s12 m8 l6">' +
		'<div class="card">' +
		'<div class="card-content">' +
		'<span class="card-title">__nombre__</span>' +
		'<p>__den__ density</p>' +
		'<p>Discovered in __disc__ with __telescopio__</p>'+
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>';

var sequence = Promise.resolve();

function getJSON(url){
	return new Promise(function(resolve,reject){
		var ajax = new XMLHttpRequest();  
		ajax.open("GET", url); 
		ajax.send(); 
		ajax.onreadystatechange = function(){ 
			if(ajax.readyState == 4){ 
				resolve(JSON.parse(ajax.responseText)); 
			}
		}
	})
};

getJSON("data/earth-like-results.json") 
	.then(function(response){
	return Promise.all(
		response.results.map(getJSON));

}).then(function(resultados){
	var plantillaFinal = " ";

	resultados.forEach(function(resultado){
		var nombre = resultado.pl_name;
		var densidad = resultado.dec;
		var descubrimiento = resultado.pl_disc;
		var telescopio = resultado.pl_telescope;  


		console.log(nombre,densidad,descubrimiento,telescopio);

		plantillaFinal += plantilla.replace('__nombre__', nombre).replace('__den__', densidad).replace('__disc__', descubrimiento).replace('__telescopio__', telescopio) ;		
		document.getElementById("cards-container").innerHTML = plantillaFinal;
	});

})

//  .then(function(mensaje){return(getJSON(mensaje.results[0]))}) 
//  .then(function(resultado){console.log(resultado.pl_name)});