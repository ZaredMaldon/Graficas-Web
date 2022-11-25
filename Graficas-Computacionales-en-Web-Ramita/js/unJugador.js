function setupScene2() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();

    createCamera2();

    cameras[0].position.set(0, 20, 0);
    cameras[0].rotation.x = THREE.Math.degToRad(-90);

    createRenderer(new THREE.Color(0, 0, 0));

    var ambientLight = new THREE.AmbientLight(
        new THREE.Color(1, 1, 1),
        1.0
    );
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(
        new THREE.Color(1, 1, 0),
        0.4
    );
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
    grid.position.y = -1;
    //scene.add(grid);

    var material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.5, 0.0, 0.0),
    });
    var geometry = new THREE.BoxGeometry(1, 1, 1);

    var player1 = new THREE.Mesh(geometry, material);
    player1.position.y = 10;
    player1.scale.set(5, 5, 5);


    player1.rayos = [
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, -1, 0),
    ];

    player1.rayos[0].AunColision = false;
    player1.rayos[1].AunColision = false;

    scene.add(player1);

    players.push(player1);

    player1.yaw = 0;
    player1.forward = 0;

    $("#scene-section-3").append(renderers[0].domElement);
}

function createCamera2() {
    var radio = visibleSize.width / visibleSize.height;
    var viewSize = 100;
    var camera = new THREE.OrthographicCamera(-radio * viewSize / 2, radio * viewSize / 2, viewSize / 2, -viewSize / 2, 0.1, 2000);
    cameras.push(camera);
}
/*************************************************************************************/
/*************************************************************************************/
/**********************************    Teclas    *************************************/
/*************************************************************************************/
/*************************************************************************************/

function onKeyDown2(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
    //debugger;

}
function onKeyUp2(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function teclas2() {
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

}

/*************************************************************************************/
/*************************************************************************************/
/**********************************    Render    *************************************/
/*************************************************************************************/
/*************************************************************************************/
function tablaDatos() {
    /***********************************************************************/
    /***********************************************************************/
    //Datos jugadores
    /***********************************************************************/
    /***********************************************************************/
    $("#tablita tr").remove();
    var fila = "<tr><td class='titulo' >" + players[0].name + "</td><td class='titulo'>" + players[0].encontrados + "</td><td class='titulo'>" + players[0].escena + "</td></tr>";
    var btn = document.createElement("TR");
    btn.innerHTML = fila;
    document.getElementById("tablita").appendChild(btn);
    fila = "<tr><td class='titulo' >" + "totalTime" + "</td><td class='titulo'>" + totalTime + "</td><td class='titulo'>" + players[0].escena + "</td></tr>";
    btn = document.createElement("TR");
    btn.innerHTML = fila;
    document.getElementById("tablita").appendChild(btn);
}
var totalTime = 0;

function Position() {
    signo1 = Math.random();
    if (signo1 > 0.5) {
        sig1 = 1;
    }
    else {
        sig1 = -1;
    }

    signo2 = Math.random();
    if (signo2 > 0.5) {
        sig2 = 1;
    }
    else {
        sig2 = -1;
    }

    x = Math.random() * 100;
    if (x > 50) {
        x = x - 50;
    }
    x = x * sig1;

    z = Math.random() * 100;
    if (z > 50) {
        z = z - 50;
    }
    z = z * sig2;

    if (x > players[0].position.x - 5 && x < players[0].position.x + 5 &&
        z > players[0].position.z - 5 && z < players[0].position.z + 5) {
        x = x * -1;
        z = z * -1;

        if (x > -5 && x < 5)
            x + 10;
        if (z > -5 && z < 5)
            z + 10;
        if (x == 0)
            x + 10;
        if (z == 0)
            z + 10;
        console.log("Entró");
    }

}
function suma() {
    /***********************************************************************/
    /***********************************************************************/
    //Objetos especiales
    /***********************************************************************/
    /***********************************************************************/
    totalTime += 1;
    if (totalTime % 100 == 0) {
        if (pausa == false) {
            Position();
            var pera = Obj_Esp02.clone();
            pera.position.x = x;
            pera.position.z = z;
            pera.activo = true;
            setTimeout(() => {
                pera.activo = false;
                scene.remove(pera);
            }, 5000);
            peras.push(pera);
            scene.add(pera);
        }
    }

    if (totalTime % 300 == 0) {
        if (pausa == false) {
            Position();
            var GP = GatoPan.clone();
            GP.position.x = x;
            GP.position.z = z;
            GP.activo = true;
            setTimeout(() => {
                GP.activo = false;
                scene.remove(GP);
            }, 5000);
            jugetes.push(GP);
            scene.add(GP);
        }
    }

    for (var i = 0; i < players[0].rayos.length; i++) {

        var rayo = players[0].rayos[i];
        RCaster.set(players[0].position, rayo);

        var colisiones = RCaster.intersectObjects(peras, true);
        var colisiones2 = RCaster.intersectObjects(jugetes, true);


        if (colisiones.length > 0 && colisiones[0].distance < 500) {
            players[0].encontrados = players[0].encontrados + 3;
            colisiones[0].object.parent.activo = false;
            colisiones[0].object.visible = false;
            scene.remove(colisiones[0].object);
        }

        if (colisiones2.length > 0 && colisiones2[0].distance < 500) {
            players[0].encontrados = players[0].encontrados + 5;
            colisiones2[0].object.parent.activo = false;
            colisiones2[0].object.visible = false;
            scene.remove(colisiones2[0].object);
        }

    }

    for (var i = 0; i < peras.length; i++) {
        if (peras[i] === undefined) continue;
        if (peras[i].activo == false) {
            peras.splice(i, 1);
            continue;
        }
    }

    for (var i = 0; i < jugetes.length; i++) {
        if (jugetes[i] === undefined) continue;
        if (jugetes[i].activo == false) {
            jugetes.splice(i, 1);
            continue;
        }
    }
}
var help = 5;
function resta() {
    for (var i = 0; i < hierbas.length; i++) {
        var difX = hierbas[i].position.x - players[0].position.x;
        var difZ = hierbas[i].position.z - players[0].position.z;
        if (difX < 0) {
            hierbas[i].position.x += help * deltaTime;
        }
        else {
            hierbas[i].position.x += -help * deltaTime;
        }

        if (difZ < 0) {
            hierbas[i].position.z += help * deltaTime;
        }
        else {
            hierbas[i].position.z += -help * deltaTime;
        }
    }

    for (var i = 0; i < players[0].rayos.length; i++) {

        var rayo = players[0].rayos[i];
        RCaster.set(players[0].position, rayo);
        var colisiones = RCaster.intersectObjects(hierbas, true);


        if (colisiones.length > 0 && colisiones[0].distance < 500) {
            if (players[0].rayos[i].AunColision == false) {
                /*console.log("Dentro de if");*/
                players[0].encontrados = players[0].encontrados - 10;
                players[0].rayos[i].AunColision = true;
            }
        }
        else {
            /*console.log("Dentro de else");*/
            players[0].rayos[i].AunColision = false;
        }



    }
}

var auxX;
var listo1 = false;
var listo2 = false;
function hierbasColision() {

    if (players[0].escena == 2 && listo1 == true) {
        auxX = hierbas[0].position.x - hierbas[1].position.x;
        if (auxX > -3 && auxX < 3) {
            hierbas[0].position.x += 2;
            hierbas[1].position.x -= 2;
        }
    }
    else if (players[0].escena == 3 && listo2 == true) {
        auxX = hierbas[0].position.x - hierbas[1].position.x;
        if (auxX > -3 && auxX < 3) {
            hierbas[0].position.x += 2;
            hierbas[1].position.x -= 2;
        }

        auxX = hierbas[1].position.x - hierbas[2].position.x;
        if (auxX > -3 && auxX < 3) {
            hierbas[0].position.x += 2;
            hierbas[1].position.x -= 2;
        }

        auxX = hierbas[0].position.x - hierbas[2].position.x;
        if (auxX > -3 && auxX < 3) {
            hierbas[0].position.x += 2;
            hierbas[1].position.x -= 2;
        }
    }

}
function render2() {
    requestAnimationFrame(render2);
    deltaTime = clock.getDelta();
    tablaDatos();
    if (pausa == false) {


        suma();
        if (dificultad == true) {
            hierbasColision();
        }
        if (totalTime > 200) {
            resta();
        }

        /***********************************************************************/
        /***********************************************************************/
        //Cambio de escena
        /***********************************************************************/
        /***********************************************************************/

        if (escenario_en_curso == false && isWorldReady == true && v1 == true && v2 == true && v3 == true && v4 == true &&
            v5 == true && v6 == true && v7 == true && v8 == true && v9 == true) {
            if (players[0].escena == 1) {
                escena01_2();
                var hierba01 = Obj_Esp01.clone();
                hierba01.name = "hierba01";
                hierba01.position.x = -20;
                hierba01.position.z = 20;
                hierbas.push(hierba01);
                scene.add(hierba01);
            }
            else if (players[0].escena == 2) {
                escena02_2();
                totalTime = -50;

                if (dificultad == true) {
                    var hierba01 = scene.getObjectByName("hierba01");
                    hierba01.position.x = -20;
                    hierba01.position.z = 20;

                    var hierba02 = Obj_Esp01.clone();
                    hierba02.name = "hierba02";
                    hierba02.position.x = 20;
                    hierba02.position.z = 20;
                    hierbas.push(hierba02);
                    scene.add(hierba02);
                    listo1 = true;
                }
            }
            else if (players[0].escena == 3) {
                escena03_2();
                totalTime = -50;

                if (dificultad == true) {
                    var hierba01 = scene.getObjectByName("hierba01");
                    hierba01.position.x = -20;
                    hierba01.position.z = 20;
                    var hierba02 = scene.getObjectByName("hierba02");
                    hierba02.position.x = 20;
                    hierba02.position.z = 20;

                    var hierba03 = Obj_Esp01.clone();
                    hierba03.name = "hierba02";
                    hierba03.position.z = -40;
                    hierbas.push(hierba03);
                    scene.add(hierba03);
                    listo2 = true;

                }

            }
            else if (players[0].escena == 4) {
                escena04_2();
            }
        }
        else if (escenario_en_curso == true && isWorldReady == true) {

            if (players[0].escena == 1) {

                if (cantidasObP1 == 0) {
                    escenario_en_curso = false;
                    players[0].escena = 2;
                }
            }
            else if (players[0].escena == 2) {
                if (cantidasObP1 == 0) {
                    escenario_en_curso = false;
                    players[0].escena = 3;
                }
            }
            else if (players[0].escena == 3) {
                if (cantidasObP1 == 0) {
                    escenario_en_curso = false;
                    players[0].escena = 4;
                }
            }
        }
        /***********************************************************************/
        /***********************************************************************/
        /***********************************************************************/
        /***********************************************************************/
        reiniciarVariables();

        actualizarRenderer2();

        if (cargado == true) {
            teclas2();
        }

        movimiento();

    }
    else
        console.log("Pause == true")
    renderers[0].render(scene, cameras[0]);


}

function actualizarRenderer2() {
    for (var i = 0; i < renderers.length; i++) {
        renderers[i].setPixelRatio(visibleSize.width / visibleSize.height);
        renderers[i].setSize(visibleSize.width, visibleSize.height);
    }
    visibleSize = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}

/*************************************************************************************/
/*************************************************************************************/
/**********************************    Escenas    *************************************/
/*************************************************************************************/
/*************************************************************************************/

function escena01_2() {
    escenario_en_curso = true;
    totalTime = 0;
    $('#scene-section-3').css("background-image", "url(./assets/forest.jpg)");
    objetosConColision = [];
    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario01.name = "escenario01";
    scene.add(escenario01);
    if (dificultad == false) {
        cantidasObP1 = 3;
    }
    else {
        cantidasObP1 = 6;
    }

    /***********************************************************************/
    /***********************************************************************/
    //Objetos escena 01
    /***********************************************************************/
    /***********************************************************************/
    var obj02_01 = Obj_02_P1.clone();
    obj02_01.scale.set(3, 3, 3);
    obj02_01.position.set(-14, -33, 0);
    obj02_01.name = "obj02_01";
    scene.add(obj02_01);
    objetosConColision.push(obj02_01);

    var obj03_01 = Obj_03_P1.clone();
    obj03_01.scale.set(2, 2, 2);
    obj03_01.position.set(16, 0, 22);
    obj03_01.name = "obj03_01";
    scene.add(obj03_01);
    objetosConColision.push(obj03_01);

    var obj04_01 = Obj_04_P1.clone();
    //obj04_01.scale.set(3, 3, 3);
    obj04_01.position.set(-5, 0, -37);
    obj04_01.name = "obj04_01";
    scene.add(obj04_01);
    objetosConColision.push(obj04_01);

    /***********************************************************************/
    /***********************************************************************/
    if (dificultad == true) {
        var obj01_01 = Obj_01_P1.clone();
        obj01_01.scale.set(3, 3, 3);
        obj01_01.position.set(0, 0, 49);
        obj01_01.name = "obj01_01";
        scene.add(obj01_01);
        objetosConColision.push(obj01_01);

        var obj05_01 = Obj_05_P1.clone();
        obj05_01.scale.set(3.8, 3.8, 3.8);
        obj05_01.position.set(-10, 0, 20);
        obj05_01.name = "obj05_01";
        scene.add(obj05_01);
        objetosConColision.push(obj05_01);

        var obj06_01 = Obj_06_P1.clone();
        obj06_01.scale.set(1.5, 1.5, 1.5);
        obj06_01.position.set(28, -40, 40);
        obj06_01.name = "obj06_01";
        scene.add(obj06_01);
        objetosConColision.push(obj06_01);
    }

}

async function escena02_2() {
    var Canvas = document.getElementById("contCanvas");
    var Contenedor = document.getElementById("contenedor");
    escenario_en_curso = true;
    totalTime = 0;
    setTimeout(function () {
        Contenedor.style.visibility = "visible";
        Contenedor.style.opacity = 1;
        Canvas.style.visibility = "hidden";
        Canvas.style.opacity = 0;
        cargado = false;
    }, 5);
    await entreEscenas_2();
    setTimeout(function () {
        Contenedor.style.visibility = "hidden";
        Contenedor.style.opacity = 0;
        Canvas.style.visibility = "visible";
        Canvas.style.opacity = 1;
        cargado = true;
    }, 5000);

}

function entreEscenas_2() {
    escenario_en_curso = true;
    players[0].position.x = 0;
    players[0].position.z = 0;
    $('#scene-section-3').css("background-image", "url(./assets/traditional-oriental-forest.jpg)");
    objetosConColision = [];
    if (dificultad == false) {
        cantidasObP1 = 3;
    }
    else {
        cantidasObP1 = 6;
    }
    /***********************************************************************/
    /***********************************************************************/
    var escenario01 = scene.getObjectByName("escenario01");
    var ob02_01 = scene.getObjectByName("obj02_01");
    var ob03_01 = scene.getObjectByName("obj03_01");
    var ob04_01 = scene.getObjectByName("obj04_01");

    scene.remove(escenario01);
    scene.remove(ob02_01);
    scene.remove(ob03_01);
    scene.remove(ob04_01);

    if (dificultad == true) {
        var ob01_01 = scene.getObjectByName("obj01_01");
        var ob05_01 = scene.getObjectByName("obj05_01");
        var ob06_01 = scene.getObjectByName("obj06_01");

        scene.remove(ob01_01);
        scene.remove(ob05_01);
        scene.remove(ob06_01);
    }


    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario02.name = "escenario02"
    scene.add(escenario02);
    /***********************************************************************/
    /***********************************************************************/
    //Objetos escena 01
    /***********************************************************************/
    /***********************************************************************/
    var obj01_01 = Obj_01_P1.clone();
    obj01_01.scale.set(3, 3, 3);
    obj01_01.position.set(5, -50, -26);
    obj01_01.name = "obj01_01";
    scene.add(obj01_01);
    objetosConColision.push(obj01_01);

    var obj02_01 = Obj_02_P1.clone();
    obj02_01.scale.set(2.5, 2.5, 2.5);
    obj02_01.position.set(-34, 0, -40);
    obj02_01.name = "obj02_01";
    scene.add(obj02_01);
    objetosConColision.push(obj02_01);

    var obj03_01 = Obj_03_P1.clone();
    obj03_01.scale.set(2, 2, 2);
    obj03_01.position.set(-15, -40, 20);
    obj03_01.name = "obj03_01";
    scene.add(obj03_01);
    objetosConColision.push(obj03_01);

    /***********************************************************************/
    /***********************************************************************/
    if (dificultad == true) {
        var obj04_01 = Obj_04_P1.clone();
        //obj04_01.scale.set(3, 3, 3);
        obj04_01.position.set(24, -10, -20);
        obj04_01.name = "obj04_01";
        scene.add(obj04_01);
        objetosConColision.push(obj04_01);

        var obj05_01 = Obj_05_P1.clone();
        obj05_01.scale.set(3.5, 3.5, 3.5);
        obj05_01.position.set(5, 0, 35);
        obj05_01.name = "obj05_01";
        scene.add(obj05_01);
        objetosConColision.push(obj05_01);

        var obj06_01 = Obj_06_P1.clone();
        obj06_01.scale.set(1.5, 1.5, 1.5);
        obj06_01.position.set(-27, -320, 20);
        obj06_01.name = "obj06_01";
        scene.add(obj06_01);
        objetosConColision.push(obj06_01);

    }

}

async function escena03_2() {
    escenario_en_curso = true;
    totalTime = 0;
    var Canvas = document.getElementById("contCanvas");
    var Contenedor = document.getElementById("contenedor");
    setTimeout(function () {
        Contenedor.style.visibility = "visible";
        Contenedor.style.opacity = 1;
        Canvas.style.visibility = "hidden";
        Canvas.style.opacity = 0;
        cargado = false;
    }, 5);
    await entreEscenas3_2();
    setTimeout(function () {
        Contenedor.style.visibility = "hidden";
        Contenedor.style.opacity = 0;
        Canvas.style.visibility = "visible";
        Canvas.style.opacity = 1;
        cargado = true;
    }, 5000);
}

function entreEscenas3_2() {
    escenario_en_curso = true;
    $('#scene-section-3').css("background-image", "url(./assets/traditional-oriental-forest.jpg)");
    objetosConColision = [];
    if (dificultad == false) {
        cantidasObP1 = 3;
    }
    else {
        cantidasObP1 = 6;
    }
    /***********************************************************************/
    /***********************************************************************/
    var escenario02 = scene.getObjectByName("escenario02");
    var ob01_01 = scene.getObjectByName("obj01_01");
    var ob02_01 = scene.getObjectByName("obj02_01");
    var ob03_01 = scene.getObjectByName("obj03_01");

    scene.remove(escenario02);
    scene.remove(ob01_01);
    scene.remove(ob02_01);
    scene.remove(ob03_01);

    if (dificultad == true) {
        var ob04_01 = scene.getObjectByName("obj04_01");
        var ob05_01 = scene.getObjectByName("obj05_01");
        var ob06_01 = scene.getObjectByName("obj06_01");

        scene.remove(ob04_01);
        scene.remove(ob05_01);
        scene.remove(ob06_01);
    }

    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario03.name = "escenario03"
    scene.add(escenario03);
    /***********************************************************************/
    /***********************************************************************/
    //Objetos escena 01
    /***********************************************************************/
    /***********************************************************************/
    var obj01_01 = Obj_01_P1.clone();
    obj01_01.scale.set(2, 2, 2);
    obj01_01.position.set(-35, 0, 28);
    obj01_01.name = "obj01_01";
    scene.add(obj01_01);
    objetosConColision.push(obj01_01);


    var obj03_01 = Obj_03_P1.clone();
    obj03_01.scale.set(2, 2, 2);
    obj03_01.position.set(0, 0, 40);
    obj03_01.name = "obj03_01";
    scene.add(obj03_01);
    objetosConColision.push(obj03_01);

    var obj04_01 = Obj_04_P1.clone();
    obj04_01.scale.set(0.8, 0.8, 0.8);
    obj04_01.position.set(30, 0, -8);
    obj04_01.name = "obj04_01";
    scene.add(obj04_01);
    objetosConColision.push(obj04_01);
    /***********************************************************************/
    /***********************************************************************/
    if (dificultad == true) {

        var obj02_01 = Obj_02_P1.clone();
        obj02_01.scale.set(2.2, 2.2, 2.2);
        obj02_01.position.set(-12, -120, -35);
        obj02_01.name = "obj02_01";
        scene.add(obj02_01);
        objetosConColision.push(obj02_01);

        var obj05_01 = Obj_05_P1.clone();
        //obj05_01.scale.set(3, 3, 3);
        obj05_01.position.set(-12, -30, 32);
        obj05_01.name = "obj05_01";
        scene.add(obj05_01);
        objetosConColision.push(obj05_01);

        var obj06_01 = Obj_06_P1.clone();
        obj06_01.scale.set(1.5, 1.5, 1.5);
        obj06_01.position.set(30, 0, 30);
        obj06_01.name = "obj06_01";
        scene.add(obj06_01);
        objetosConColision.push(obj06_01);
    }

}

function escena04_2() {
    totalTime = 0;
    escenario_en_curso = true;
    var Canvas = document.getElementById("contCanvas");
    var Contenedor = document.getElementById("contenedor");
    var Ganador = document.getElementById("Ganador");
    var Cargando = document.getElementById("Cargando");
    $("#Felicidades").text("Jugador " + players[0].name + " terminaste el juego con " + players[0].encontrados + " puntos");
    $("#ctmlmad").text(""+ players[0].encontrados + "");
    setTimeout(function () {
        Contenedor.style.visibility = "visible";
        Contenedor.style.opacity = 1;
        Ganador.style.visibility = "visible";
        Ganador.style.opacity = 1;
        Canvas.style.visibility = "hidden";
        Canvas.style.opacity = 0;
        Cargando.style.visibility = "hidden";
        Cargando.style.opacity = 0;
        cargado = false;
    }, 5);
    console.log("escena04");
    var punto = new puntos(players[0].name, players[0].encontrados);
    var dataToSend = {
        action: "Agregar1",
        nombre: punto.nombre,
        puntos: punto.puntos,
    };

    var objetoEnJSON = JSON.stringify(dataToSend);
    var objetoDesdeJSON = JSON.parse(objetoEnJSON);

    $.ajax({
        url: "webservice/webservice.php",
        async: true,
        type: 'POST',
        data: dataToSend,
        success: function (data) {
            alert(data);
        },
        error: function (x, y, z) {
            alert("Error en webservice: " + x + y + z);
        }
        //..
    });
}

function ObjetosEspeciales() {
    Obj_Esp01.name = "Obj_Esp01";
    scene.add(Obj_Esp01);

    Obj_Esp02.name = "Obj_Esp02";
    scene.add(Obj_Esp02);

    GatoPan.name = "GatoPan";
    scene.add(GatoPan);
}