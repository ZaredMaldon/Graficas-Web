function escena01() {
    $('#scene-section').css("background-image", "url(./assets/forest.jpg)");
    $('#scene-section-2').css("background-image", "url(./assets/forest.jpg)");
    objetosConColision = [];
    objetosConColision2 = [];
    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario01.name = "escenario01";
    var copia = escenario01.clone();
    copia.name = "escenario01_copia"
    scene.add(escenario01);
    scene2.add(copia);
    if (dificultad == false) {
        cantidasObP1 = 3;
        cantidasObP2 = 3;
    }
    else {
        cantidasObP1 = 6;
        cantidasObP2 = 6;
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
    //Objetos escena 02
    /***********************************************************************/
    /***********************************************************************/
    var obj01_02 = Obj_01_P2.clone();
    obj01_02.scale.set(3, 3, 3);
    obj01_02.position.set(25, 0, -10);
    obj01_02.name = "obj01_02";
    scene2.add(obj01_02);
    objetosConColision2.push(obj01_02);

    var obj02_02 = Obj_02_P2.clone();
    obj02_02.scale.set(3, 3, 3);
    obj02_02.position.set(-14, -33, 30);
    obj02_02.name = "obj02_02";
    scene2.add(obj02_02);
    objetosConColision2.push(obj02_02);


    var obj05_02 = Obj_05_P2.clone();
    //obj05_02.scale.set(3, 3, 3);
    obj05_02.position.set(-38, -40, 37);
    obj05_02.name = "obj05_02";
    scene2.add(obj05_02);
    objetosConColision2.push(obj05_02);

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

        var obj03_02 = Obj_03_P2.clone();
        obj03_02.scale.set(2, 2, 2);
        obj03_02.position.set(-30, -50, 30);
        obj03_02.name = "obj03_02";
        scene2.add(obj03_02);
        objetosConColision2.push(obj03_02);

        var obj04_02 = Obj_04_P2.clone();
        obj04_02.scale.set(1.2, 1.2, 1.2);
        obj04_02.position.set(25, 0, 0);
        obj04_02.name = "obj04_02";
        scene2.add(obj04_02);
        objetosConColision2.push(obj04_02);


        var obj06_02 = Obj_06_P2.clone();
        obj06_02.scale.set(1.5, 1.5, 1.5);
        obj06_02.position.set(20, -10, 38);
        obj06_02.name = "obj06_02";
        scene2.add(obj06_02);
        objetosConColision2.push(obj06_02);
    }
    escenario_en_curso = true;
}

async function escena02() {
    var Canvas = document.getElementById("contCanvas");
    var Contenedor = document.getElementById("contenedor");

    setTimeout(function () {
        Contenedor.style.visibility = "visible";
        Contenedor.style.opacity = 1;
        Canvas.style.visibility = "hidden";
        Canvas.style.opacity = 0;
        cargado = false;
    }, 5);
    await entreEscenas();
    setTimeout(function () {
        Contenedor.style.visibility = "hidden";
        Contenedor.style.opacity = 0;
        Canvas.style.visibility = "visible";
        Canvas.style.opacity = 1;
        cargado = true;
    }, 5000);

}

function entreEscenas() {
    players[0].position.x = 0;
    players[0].position.z = 0;
    players[1].position.x = 0;
    players[1].position.z = 0;
    $('#scene-section').css("background-image", "url(./assets/traditional-oriental-forest.jpg)");
    $('#scene-section-2').css("background-image", "url(./assets/traditional-oriental-forest.jpg)");
    objetosConColision = [];
    objetosConColision2 = [];
    if (dificultad == false) {
        cantidasObP1 = 3;
        cantidasObP2 = 3;
    }
    else {
        cantidasObP1 = 6;
        cantidasObP2 = 6;
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

    var escenario01_copia = scene2.getObjectByName("escenario01_copia");
    var ob01_02 = scene2.getObjectByName("obj01_02");
    var ob02_02 = scene2.getObjectByName("obj02_02");
    var ob05_02 = scene2.getObjectByName("obj05_02");

    scene2.remove(escenario01_copia);

    scene2.remove(ob01_02);
    scene2.remove(ob02_02);
    scene2.remove(ob05_02);


    if (dificultad == true) {
        var ob01_01 = scene.getObjectByName("obj01_01");
        var ob05_01 = scene.getObjectByName("obj05_01");
        var ob06_01 = scene.getObjectByName("obj06_01");

        scene.remove(ob01_01);
        scene.remove(ob05_01);
        scene.remove(ob06_01);

        var ob03_02 = scene2.getObjectByName("obj03_02");
        var ob04_02 = scene2.getObjectByName("obj04_02");
        var ob06_02 = scene2.getObjectByName("obj06_02");

        scene2.remove(ob03_02);
        scene2.remove(ob04_02);
        scene2.remove(ob06_02);
    }


    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario02.name = "escenario02"
    var copia = escenario02.clone();
    copia.name = "escenario02_copia"
    scene.add(escenario02);
    scene2.add(copia);
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
    //Objetos escena 02
    /***********************************************************************/
    /***********************************************************************/

    var obj02_02 = Obj_02_P2.clone();
    obj02_02.scale.set(3, 3, 3);
    obj02_02.position.set(0, 0, 35);
    obj02_02.name = "obj02_02";
    scene2.add(obj02_02);
    objetosConColision2.push(obj02_02);

    var obj03_02 = Obj_03_P2.clone();
    obj03_02.scale.set(2, 2, 2);
    obj03_02.position.set(20, 0, -30);
    obj03_02.name = "obj03_02";
    scene2.add(obj03_02);
    objetosConColision2.push(obj03_02);

    var obj04_02 = Obj_04_P2.clone();
    obj04_02.scale.set(1.2, 1.2, 1.2);
    obj04_02.position.set(-35, -350, 15);
    obj04_02.name = "obj04_02";
    scene2.add(obj04_02);
    objetosConColision2.push(obj04_02);

    /***********************************************************************/
    /***********************************************************************/
    if (dificultad == true) {
        var obj01_02 = Obj_01_P2.clone();
        obj01_02.scale.set(3, 3, 3);
        obj01_02.position.set(20, 0, 20);
        obj01_02.name = "obj01_02";
        scene2.add(obj01_02);
        objetosConColision2.push(obj01_02);

        var obj05_02 = Obj_05_P2.clone();
        //obj05_02.scale.set(3, 3, 3);
        obj05_02.position.set(-23, -350, -27);
        obj05_02.name = "obj05_02";
        scene2.add(obj05_02);
        objetosConColision2.push(obj05_02);

        var obj06_02 = Obj_06_P2.clone();
        obj06_02.scale.set(1.5, 1.5, 1.5);
        obj06_02.position.set(34, -50, 35);
        obj06_02.name = "obj06_02";
        scene2.add(obj06_02);
        objetosConColision2.push(obj06_02);

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

    escenario_en_curso = true;
}

async function escena03() {
    var Canvas = document.getElementById("contCanvas");
    var Contenedor = document.getElementById("contenedor");
    setTimeout(function () {
        Contenedor.style.visibility = "visible";
        Contenedor.style.opacity = 1;
        Canvas.style.visibility = "hidden";
        Canvas.style.opacity = 0;
        cargado = false;
    }, 5);
    await entreEscenas3();
    setTimeout(function () {
        Contenedor.style.visibility = "hidden";
        Contenedor.style.opacity = 0;
        Canvas.style.visibility = "visible";
        Canvas.style.opacity = 1;
        cargado = true;
    }, 5000);
}

function entreEscenas3() {
    $('#scene-section').css("background-image", "url(./assets/traditional-oriental-forest.jpg)");
    $('#scene-section-2').css("background-image", "url(./assets/traditional-oriental-forest.jpg)");
    objetosConColision = [];
    objetosConColision2 = [];
    if (dificultad == false) {
        cantidasObP1 = 3;
        cantidasObP2 = 3;
    }
    else {
        cantidasObP1 = 6;
        cantidasObP2 = 6;
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

    var escenario02_copia = scene2.getObjectByName("escenario02_copia");
    var obj02_02 = scene2.getObjectByName("obj02_02");
    var obj03_02 = scene2.getObjectByName("obj03_02");
    var obj04_02 = scene2.getObjectByName("obj04_02");

    scene2.remove(escenario02_copia);
    scene2.remove(obj02_02);
    scene2.remove(obj03_02);
    scene2.remove(obj04_02);

    if (dificultad == true) {
        var ob04_01 = scene.getObjectByName("obj04_01");
        var ob05_01 = scene.getObjectByName("obj05_01");
        var ob06_01 = scene.getObjectByName("obj06_01");

        scene.remove(ob04_01);
        scene.remove(ob05_01);
        scene.remove(ob06_01);

        var obj01_02 = scene2.getObjectByName("obj01_02");
        var obj05_02 = scene2.getObjectByName("obj05_02");
        var obj06_02 = scene2.getObjectByName("obj06_02");

        scene2.remove(obj01_02);
        scene2.remove(obj05_02);
        scene2.remove(obj06_02);
    }

    /***********************************************************************/
    /***********************************************************************/
    //Escenario
    /***********************************************************************/
    /***********************************************************************/
    escenario03.name = "escenario03"
    var copia = escenario03.clone();
    copia.name = "escenario03_copia"
    scene.add(escenario03);
    scene2.add(copia);
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
    //Objetos escena 02
    /***********************************************************************/
    /***********************************************************************/
    var obj01_02 = Obj_01_P2.clone();
    obj01_02.scale.set(3, 3, 3);
    obj01_02.position.set(30, 0, -5);
    obj01_02.name = "obj01_02";
    scene2.add(obj01_02);
    objetosConColision2.push(obj01_02);

    var obj05_02 = Obj_05_P2.clone();
    obj05_02.scale.set(3, 3, 3);
    obj05_02.position.set(-10, -100, -30);
    obj05_02.name = "obj05_02";
    scene2.add(obj05_02);
    objetosConColision2.push(obj05_02);

    var obj06_02 = Obj_06_P2.clone();
    obj06_02.scale.set(1.5, 1.5, 1.5);
    obj06_02.position.set(-15, -30, 32);
    obj06_02.name = "obj06_02";
    scene2.add(obj06_02);
    objetosConColision2.push(obj06_02);
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

        var obj02_02 = Obj_02_P2.clone();
        obj02_02.scale.set(2, 2, 2);
        obj02_02.position.set(0, 0, 45);
        obj02_02.name = "obj02_02";
        scene2.add(obj02_02);
        objetosConColision2.push(obj02_02);

        var obj03_02 = Obj_03_P2.clone();
        obj03_02.scale.set(1.8, 1.8, 1.8);
        obj03_02.position.set(30, 0, 20);
        obj03_02.name = "obj03_02";
        scene2.add(obj03_02);
        objetosConColision2.push(obj03_02);

        var obj04_02 = Obj_04_P2.clone();
        obj04_02.scale.set(0.8, 0.8, 0.8);
        obj04_02.position.set(-25, 0, -5);
        obj04_02.name = "obj04_02";
        scene2.add(obj04_02);
        objetosConColision2.push(obj04_02);
    }

    escenario_en_curso = true;
}

function escena04() {
    escenario_en_curso = true;
    var Canvas = document.getElementById("contCanvas");
    var Contenedor = document.getElementById("contenedor");
    var Ganador = document.getElementById("Ganador");
    var Cargando = document.getElementById("Cargando");
    if (players[0].encontrados == players[1].encontrados){
        $("#Felicidades").text("Felicidades " + players[0].name + " y " + players[1].name + " por empatar el juego");
    }
    else if (players[0].encontrados > players[1].encontrados) {
        $("#Felicidades").text("Felicidades " + players[0].name + " por ganar el juego con:" + players[0].encontrados + " objetos");
    } else {
        $("#Felicidades").text("Felicidades " + players[1].name + " por ganar el juego con:" + players[1].encontrados + " objetos");

    }

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
    var puntos = new puntuaciones (players[0].name, players[0].encontrados, players[1].name, players[1].encontrados);
    var dataToSend = {
        action: "Agregar",
        nombre1: puntos.nombreJugador1,
        puntos1: puntos.puntosJugador1,
        nombre2: puntos.nombreJugador2,
        puntos2: puntos.puntosJugador2
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
