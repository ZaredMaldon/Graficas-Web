/*function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
    //debugger;

}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function reiniciarVariables() {
    //Reiniciar variables
    for (var i = 0; i < players.length; i++) {
        players[i].yaw = 0;
        players[i].forward = 0;
    }
}

function teclas() {



    //Player 1
    if (keys["A"]) {
        players[0].yaw = -10;
    } else if (keys["D"]) {
        players[0].yaw = 10;
    }
    if (keys["W"]) {
        players[0].forward = -10;
    } else if (keys["S"]) {
        players[0].forward = 10;
    } else if (keys["Q"]) {
        for (var i = 0; i < players[0].rayos.length; i++) {

            var rayo = players[0].rayos[i];

            //1er parametro desde que punto va a ser lanzado el rayo o vector
            //2do parametro es el rayo o vector
            RCaster.set(players[0].position, rayo);

            //Detectar la colision de 1 objeto que se pone dentro de ()
            //true es para decir que tambien quieres saber si colisionó con los hijos de estos objetos
            var colisiones = RCaster.intersectObjects(objetosConColision, true);


            if (colisiones.length > 0 && colisiones[0].distance < 500) {
                players[0].encontrados = players[0].encontrados + 1;
                colisiones[0].object.visible = false;
                cantidasObP1 = cantidasObP1 - 1;
            }

        }
    }


    //Player 2
    if (keys["%"]) {
        players[1].yaw = -10;
    } else if (keys["'"]) {
        players[1].yaw = 10;
    }
    if (keys["&"]) {
        players[1].forward = -10;
    } else if (keys["("]) {
        players[1].forward = 10;
    } else if (keys["a"]) {
        for (var i = 0; i < players[1].rayos.length; i++) {

            var rayo = players[1].rayos[i];

            //1er parametro desde que punto va a ser lanzado el rayo o vector
            //2do parametro es el rayo o vector
            RCaster.set(players[1].position, rayo);

            //Detectar la colision de 1 objeto que se pone dentro de ()
            //true es para decir que tambien quieres saber si colisionó con los hijos de estos objetos
            var colisiones = RCaster.intersectObjects(objetosConColision2, true);


            if (colisiones.length > 0 && colisiones[0].distance < 500) {
                players[1].encontrados = players[1].encontrados + 1;
                colisiones[0].object.visible = false;
                cantidasObP2 = cantidasObP2 - 1;

            }

        }
    }
}

function movimiento() {
    //crear movimiento
    for (var i = 0; i < players.length; i++) {
        players[i].position.x += players[i].yaw * deltaTime;
        players[i].position.z += players[i].forward * deltaTime;
        if (players[i].position.x > 50) {
            players[i].position.x = 50;
        }
        else if (players[i].position.x < -50) {
            players[i].position.x = -50;
        }
        else if (players[i].position.z > 50) {
            players[i].position.z = 50;
        }
        else if (players[i].position.z < -50) {
            players[i].position.z = -50;
        }
    }

}*/


function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
    //debugger;

}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function reiniciarVariables() {
    //Reiniciar variables
    for (var i = 0; i < players.length; i++) {
        players[i].yaw = 0;
        players[i].forward = 0;
    }
}

function teclas() {



    //Player 1
    if (keys["A"]) {
        players[0].yaw = -10;
    } else if (keys["D"]) {
        players[0].yaw = 10;
    }
    if (keys["W"]) {
        players[0].forward = -10;
    } else if (keys["S"]) {
        players[0].forward = 10;
    } else if (keys["Q"]) {
        for (var i = 0; i < players[0].rayos.length; i++) {

            var rayo = players[0].rayos[i];

            //1er parametro desde que punto va a ser lanzado el rayo o vector
            //2do parametro es el rayo o vector
            RCaster.set(players[0].position, rayo);

            //Detectar la colision de 1 objeto que se pone dentro de ()
            //true es para decir que tambien quieres saber si colisionó con los hijos de estos objetos
            var colisiones = RCaster.intersectObjects(objetosConColision, true);


            if (colisiones.length > 0 && colisiones[0].distance < 500) {
                players[0].encontrados = players[0].encontrados + 1;
                colisiones[0].object.visible = false;
                cantidasObP1 = cantidasObP1 - 1;
            }

        }
    }


    //Player 2
    if (keys["j"]) {
        players[1].yaw = -10;
    } else if (keys["k"]) {
        players[1].yaw = 10;
    }
    if (keys["l"]) {
        players[1].forward = -10;
    } else if (keys["i"]) {
        players[1].forward = 10;
    } else if (keys["p"]) {
        for (var i = 0; i < players[1].rayos.length; i++) {

            var rayo = players[1].rayos[i];

            //1er parametro desde que punto va a ser lanzado el rayo o vector
            //2do parametro es el rayo o vector
            RCaster.set(players[1].position, rayo);

            //Detectar la colision de 1 objeto que se pone dentro de ()
            //true es para decir que tambien quieres saber si colisionó con los hijos de estos objetos
            var colisiones = RCaster.intersectObjects(objetosConColision2, true);


            if (colisiones.length > 0 && colisiones[0].distance < 500) {
                players[1].encontrados = players[1].encontrados + 1;
                colisiones[0].object.visible = false;
                cantidasObP2 = cantidasObP2 - 1;

            }

        }
    }
}

function movimiento() {
    //crear movimiento
    for (var i = 0; i < players.length; i++) {
        players[i].position.x += players[i].yaw * deltaTime;
        players[i].position.z += players[i].forward * deltaTime;
        if (players[i].position.x > 50) {
            players[i].position.x = 50;
        }
        else if (players[i].position.x < -50) {
            players[i].position.x = -50;
        }
        else if (players[i].position.z > 50) {
            players[i].position.z = 50;
        }
        else if (players[i].position.z < -50) {
            players[i].position.z = -50;
        }
    }

}