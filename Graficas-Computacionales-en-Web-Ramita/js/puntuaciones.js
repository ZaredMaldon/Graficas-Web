$(document).ready(function () {
    getProducts();
    function getProducts() {
        var dataToSend = { action: "getProducts" };
        $.ajax({
            url: "webservice/webservice.php",
            async: true,
            type: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function (data) {
                
                data.forEach(function (data) {
                  //var puntos = new puntos(data.p_nombre, data.p_puntuaciones);
                  var fila = "<tr><td class='titulo' >" + data.p_nombre + "</td><td class='titulo'>" + data.p_puntuaciones;	
                  console.log(data.p_nombre, data.p_puntuaciones); 
                  
                  $('.ListaPuntuaciones').append(fila);	
                    });
            },
            error: function (x, y) {
                alert("Error en webservice: " + x + y);
            }
        });
    }
    /*
    var fila = "<tr><td class='titulo' >" + players[0].name + "</td><td class='titulo'>" + players[0].encontrados + "</td><td class='titulo'>" + players[0].escena + "</td></tr>";
    var btn = document.createElement("TR");
    btn.innerHTML = fila;
    var fila2 = "<tr><td class='titulo' >" + players[1].name + "</td><td class='titulo'>" + players[1].encontrados + "</td><td class='titulo'>" + players[1].escena + "</td></tr>";
    var btn2 = document.createElement("TR");
    btn2.innerHTML = fila2;
    document.getElementById("tablita").appendChild(btn);
    document.getElementById("tablita").appendChild(btn2);
    */
});