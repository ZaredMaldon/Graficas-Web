import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from "../librerias/GLTFLoader";
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

function CargarModeloGlb(scene,ruta,escalax,escalay,escalaz,posx,posy,posz) {
    const loaderGLTF = new GLTFLoader();
    loaderGLTF.load(
    ruta,
    function (gltf) {
        let obj = gltf.scene;
        obj.scale.set(escalax, escalay, escalaz);
        obj.position.x=posx;
        obj.position.y=posy;
        obj.position.z=posz;
        scene.add(obj);
    });
}

function CargarModeloFbx(ruta,manager){
    var fbx_loader = new THREE.FBXLoader(manager);
    // modelo estático fbx
    fbx_loader.load(ruta, function(object){
    object.scale.multiplyScalar(.1);
    scene.add(object);
    }, onProgress, onError);

}