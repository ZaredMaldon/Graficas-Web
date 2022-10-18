import * as THREE from "../librerias/three.module.js";
import { GLTFLoader } from "../librerias/GLTFLoader";

function CargarModeloGlb(scene,direccion,escalax,escalay,escalaz,posx,posy,posz) {
    const loaderGLTF = new GLTFLoader();
    loaderGLTF.load(
    direccion,
    function (gltf) {
        let obj = gltf.scene;
        obj.scale.set(escalax, escalay, escalaz);
        obj.position.x=posx;
        obj.position.y=posy;
        obj.position.z=posz;
        scene.add(obj);
    });
}
