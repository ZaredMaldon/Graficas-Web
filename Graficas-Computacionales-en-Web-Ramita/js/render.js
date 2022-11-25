function actualizarRenderer() {
        for (var i = 0; i < renderers.length; i++) {
                renderers[i].setPixelRatio(visibleSize.width / 2 / visibleSize.height);
                renderers[i].setSize(visibleSize.width / 2, visibleSize.height);
        }
        visibleSize = {
                width: window.innerWidth,
                height: window.innerHeight,
        };
}

function render() {
        requestAnimationFrame(render);
        deltaTime = clock.getDelta();

        /***********************************************************************/
        /***********************************************************************/
        //Datos jugadores
        /***********************************************************************/
        /***********************************************************************/
        $("#tablita tr").remove();
        var fila = "<tr><td class='titulo' >" + players[0].name + "</td><td class='titulo'>" + players[0].encontrados + "</td><td class='titulo'>" + players[0].escena + "</td></tr>";
        var btn = document.createElement("TR");
        btn.innerHTML = fila;
        var fila2 = "<tr><td class='titulo' >" + players[1].name + "</td><td class='titulo'>" + players[1].encontrados + "</td><td class='titulo'>" + players[1].escena + "</td></tr>";
        var btn2 = document.createElement("TR");
        btn2.innerHTML = fila2;
        document.getElementById("tablita").appendChild(btn);
        document.getElementById("tablita").appendChild(btn2);
        if (pausa == false) {
                /***********************************************************************/
                /***********************************************************************/
                //Cambio de escena
                /***********************************************************************/
                /***********************************************************************/
                if (escenario_en_curso == false && isWorldReady == true && v1 == true && v2 == true && v3 == true && v4 == true &&
                        v5 == true && v6 == true && v7 == true && v8 == true && v9 == true) {
                        if (players[1].escena == 1) {
                                escena01();
                        }
                        else if (players[1].escena == 2) {
                                escena02();
                        }
                        else if (players[1].escena == 3) {
                                escena03();
                        }
                        else if (players[1].escena == 4) {
                                escena04();
                        }
                }
                else if (escenario_en_curso == true && isWorldReady == true) {

                        if (players[1].escena == 1) {

                                if (cantidasObP1 == 0 || cantidasObP2 == 0) {
                                        escenario_en_curso = false;
                                        players[0].escena = 2;
                                        players[1].escena = 2;
                                }
                        }
                        else if (players[1].escena == 2) {
                                if (cantidasObP1 == 0 || cantidasObP2 == 0) {
                                        escenario_en_curso = false;
                                        players[0].escena = 3;
                                        players[1].escena = 3;
                                }
                        }
                        else if (players[1].escena == 3) {
                                if (cantidasObP1 == 0 || cantidasObP2 == 0) {
                                        escenario_en_curso = false;
                                        players[0].escena = 4;
                                        players[1].escena = 4;
                                }
                        }
                }
                /***********************************************************************/
                /***********************************************************************/
                /***********************************************************************/
                /***********************************************************************/
                reiniciarVariables();

                actualizarRenderer();

                if (cargado == true) {
                        teclas();
                }

                movimiento();
        }
        renderers[0].render(scene, cameras[0]);
        renderers[1].render(scene2, cameras[1]);

}
