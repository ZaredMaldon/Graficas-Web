/***********************************************************************/
/***********************************************************************/
//tamaño de la ventana, scene, camera, render, clock, deltatime
/***********************************************************************/
/***********************************************************************/
var numJugadores;
var cargado;
var scene;
var scene2;
var camera;
var renderer;
var controls;
var clock;
var deltaTime;
var keys = {};
var visibleSize = {
    width: window.innerWidth,
    height: window.innerHeight,
};
/***********************************************************************/
/***********************************************************************/
//Canvas
/***********************************************************************/
/***********************************************************************/
var Canvas1 = document.getElementById("scene-section");
var Canvas2 = document.getElementById("scene-section-2");
var Canvas = document.getElementById("c");
/***********************************************************************/
/***********************************************************************/
//Arreglos
/***********************************************************************/
/***********************************************************************/
var renderers = [];
var cameras = [];
var players = [];
/***********************************************************************/
/***********************************************************************/
//Datos jugadores
/***********************************************************************/
/***********************************************************************/
var NombreSave;
var NombreSave2;
var RCaster;
var objetosConColision = [];
var objetosConColision2 = [];
var peras = [];
var jugetes = [];
var hierbas = [];
/***********************************************************************/
/***********************************************************************/
//Escenarios
/***********************************************************************/
/***********************************************************************/
var isWorldReady = false;
var pausa = false;
var escenario01;
var escenario02;
var escenario03;
var escenario_en_curso = false;
var cantidasObP1 = 0;
var cantidasObP2 = 0;
var dificultad = false;
var v1 = false;
var v2 = false;
var v3 = false;
var v4 = false;
var v5 = false;
var v6 = false;
var v7 = false;
var v8 = false;
var v9 = false;
/***********************************************************************/
/***********************************************************************/
//Objetos
/***********************************************************************/
/***********************************************************************/
//jugador 01
var Obj_01_P1;
var Obj_02_P1;
var Obj_03_P1;
var Obj_04_P1;
var Obj_05_P1;
var Obj_06_P1;
//jugador 02
var Obj_01_P2;
var Obj_02_P2;
var Obj_03_P2;
var Obj_04_P2;
var Obj_05_P2;
var Obj_06_P2;
// Especiales
var Obj_Esp01;
var Obj_Esp02;
var GatoPan;
var sig1;
var sig2;
var signo1;
var signo2;
var x;
var z;