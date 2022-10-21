import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
//import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/MTLLoader.js';

const pos = new THREE.Vector3();

class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};


class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -3.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._velocity2 = new THREE.Vector3(0, 0, 0);

    this._animations = {};
    this._animations2 = {};
    this._input = new BasicCharacterControllerInput2();
    this._input2 = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
        new BasicCharacterControllerProxy(this._animations));
        this._stateMachine2 = new CharacterFSM(
          new BasicCharacterControllerProxy(this._animations2));
  
    this._LoadModels();
    this._LoadStaticModelfbx('../modelos/','diamond.fbx',0.1);
    pos.set(0,0,0);
    this._LoadStaticModelfbx('../modelos/isla/','isla_fbx.fbx',1.5,pos);
    pos.set(0,0,0);
    this._LoadStaticModelobj('../modelos/TiroAlBlanco.obj','../modelos/10480_Archery_target_v1_max2011_iteration-2.mtl',1.5,pos);
    //this._LoadStaticModelfbx('../modelos/fogata/','fogata_fbx.fbx',1.5);
  }

  _LoadStaticModelfbx(ruta,nombre,escala,position) {
    const loader = new FBXLoader();
    
    loader.setPath(ruta);
    loader.load(nombre, (fbx) => {
      fbx.scale.setScalar(escala);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      
      this._target = fbx;
      this._params.scene.add(this._target);
    });
  }

  _LoadStaticModelobj(ruta,mtlrute,escala,position){
    const mtlLoader = new MTLLoader();
    const loader = new OBJLoader();
    //mtlLoader.setMaterialOptions('../modelos/WhatsApp_Image_2022-10-21_at_3.17.29_AM.jpeg');
    mtlLoader.load(mtlrute,(materials)=>{
        materials.preload();
        console.log(materials);
        loader.setMaterials(materials);
        loader.load(ruta,(obj)=>{
        //obj.scale.setScalar(escala);
        obj.traverse(c => {
          c.castShadow = true;
          //c.receiveShadow=true;
        });
        this._target = obj;
        this._params.scene.add(this._target);
      });
    });
    
  }

  _LoadModels() {
    const loader = new FBXLoader();
    //CargarModeloFbx('../modelos/Set of Floating Islands.fbx',this._manager);
    loader.setPath('./resources/Archero/');
    loader.load('Archer.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      
      this._target = fbx;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      this._manager = new THREE.LoadingManager();
      this._manager.onLoad = () => {
        this._stateMachine.SetState('idle');
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);
  
        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      loader.setPath('./resources/Archero/');
      loader.load('Crouched Walking.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('Archidle1.fbx', (a) => { _OnLoad('idle', a); });
    });
    const loader2 = new FBXLoader();
    loader2.setPath('./resources/Archero/');
    loader2.load('Archer.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      
      this._Arquero2 = fbx;
      this._Arquero2.name="arquero2";
      this._Arquero2.position.x=20;
      this._params.scene.add(this._Arquero2);
     
      this._mixer2 = new THREE.AnimationMixer(this._Arquero2);

      this._manager2 = new THREE.LoadingManager();
      this._manager2.onLoad = () => {
        this._stateMachine2.SetState('idle');
      };

      const _OnLoad2 = (animName, anim) => {
        const clip2 = anim.animations[0];
        const action2 = this._mixer2.clipAction(clip2);
  
        this._animations2[animName] = {
          clip: clip2,
          action: action2,
        };
      };

      const loader2 = new FBXLoader(this._manager2);
      loader2.setPath('./resources/Archero/');
      loader2.load('Crouched Walking.fbx', (a) => { _OnLoad2('walk', a); });
      loader2.load('Archidle1.fbx', (a) => { _OnLoad2('idle', a); });
    });
    
  }


  _LoadStaticModel(ruta,nombre,escala) {
    const loader = new FBXLoader();
    //CargarModeloFbx('../modelos/Set of Floating Islands.fbx',this._manager);
    loader.setPath(ruta);
    loader.load(nombre, (fbx) => {
      fbx.scale.setScalar(escala);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      
      this._target = fbx;
      this._params.scene.add(this._target);
    });
  }

  Update(timeInSeconds) {
    if (!this._target) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const velocity2 = this._velocity2;
    const frameDecceleration = new THREE.Vector3(
        velocity.x * this._decceleration.x,
        velocity.y * this._decceleration.y,
        velocity.z * this._decceleration.z
    );
    const frameDecceleration2 = new THREE.Vector3(
      velocity2.x * this._decceleration.x,
      velocity2.y * this._decceleration.y,
      velocity2.z * this._decceleration.z
  );
    
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));
     frameDecceleration2.multiplyScalar(timeInSeconds);
        frameDecceleration2.z = Math.sign(frameDecceleration2.z) * Math.min(
            Math.abs(frameDecceleration2.z), Math.abs(velocity2.z));

    velocity.add(frameDecceleration);
    velocity2.add(frameDecceleration2);
    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    if (this._stateMachine._currentState.Name == 'atack') {
      acc.multiplyScalar(0.0);
    }

    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    oldPosition.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }

      // movimiento del segundo jugador
      
    this._stateMachine2.Update(timeInSeconds, this._input2);
    const controlObject2 = this._Arquero2;
    const _Q2 = new THREE.Quaternion();
    const _A2 = new THREE.Vector3();
    const _R2 = controlObject2.quaternion.clone();

    const acc2 = this._acceleration.clone();
    if (this._input2._keys.shift) {
      acc2.multiplyScalar(2.0);
    }


    if (this._input2._keys.forward) {
      velocity2.z += acc2.z * timeInSeconds;
    }
    if (this._input2._keys.backward) {
      velocity2.z -= acc2.z * timeInSeconds;
    }
    if (this._input2._keys.left) {
      _A2.set(0, 1, 0);
      _Q2.setFromAxisAngle(_A2, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R2.multiply(_Q2);
    }
    if (this._input2._keys.right) {
      _A2.set(0, 1, 0);
      _Q2.setFromAxisAngle(_A2, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R2.multiply(_Q2);
    }

    controlObject2.quaternion.copy(_R2);

    const oldPosition2 = new THREE.Vector3();
    oldPosition2.copy(controlObject2.position);

    const forward2 = new THREE.Vector3(0, 0, 1);
    forward2.applyQuaternion(controlObject2.quaternion);
    forward2.normalize();

    const sideways2 = new THREE.Vector3(1, 0, 0);
    sideways2.applyQuaternion(controlObject2.quaternion);
    sideways2.normalize();

    sideways2.multiplyScalar(velocity2.x * timeInSeconds);
    forward2.multiplyScalar(velocity2.z * timeInSeconds);

    controlObject2.position.add(forward2);
    controlObject2.position.add(sideways2);

    oldPosition2.copy(controlObject2.position);

    if (this._mixer2) {
      this._mixer2.update(timeInSeconds);
    }


  }
};

class BasicCharacterControllerInput {
  constructor() {
    this._Init();    
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
};

class BasicCharacterControllerInput2 {
  constructor() {
    this._Init();    
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 73: // i
        this._keys.forward = true;
        break;
      case 74: // j
        this._keys.left = true;
        break;
      case 75: // k
        this._keys.backward = true;
        break;
      case 76: // l
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 73: // i
        this._keys.forward = false;
        break;
      case 74: // j
        this._keys.left = false;
        break;
      case 75: // k
        this._keys.backward = false;
        break;
      case 76: // l
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
};

class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  _AddState(name, type) {
    this._states[name] = type;
  }

  SetState(name) {
    const prevState = this._currentState;
    
    if (prevState) {
      if (prevState.Name == name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this._states[name](this);

    this._currentState = state;
    state.Enter(prevState);
  }

  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
};


class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    this._AddState('run', RunState);
    this._AddState('dance', DanceState);
  }
};


class State {
  constructor(parent) {
    this._parent = parent;
  }

  Enter() {}
  Exit() {}
  Update() {}
};


class DanceState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'dance';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['dance'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();  
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['dance'].action;
    
    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};


class WalkState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class RunState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(_, input) {
    if (input._keys.forward || input._keys.backward) {
      this._parent.SetState('walk');
    } else if (input._keys.space) {
      this._parent.SetState('dance');
    }
  }
};


class CharacterControllerDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.outputEncoding = THREE.sRGBEncoding;
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(25, 10, 25);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 50;
    light.shadow.camera.right = -50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    this._scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF, 0.25);
    this._scene.add(light);

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 10, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/negx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posz.jpg',
        './resources/negz.jpg',
    ]);
    texture.encoding = THREE.sRGBEncoding;
    this._scene.background = texture;

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0x808080,
          }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);
    
    const plane2 = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 3, 10, 10),
      new THREE.MeshStandardMaterial({
          color: 0xff0000,
        }));
  plane2.castShadow = false;
  plane2.receiveShadow = true;
  plane2.name="plano";
  this._scene.add(plane2);
    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    this._RAF();
  }

  _LoadAnimatedModel() {
    const params = {
      camera: this._camera,
      scene: this._scene,
    }
    this._controls = new BasicCharacterController(params);
  }

  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });
      fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }
      this._scene.getObjectByName("plano").position.y=20;
      
      this._RAF();
      
      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new CharacterControllerDemo();
});

function CargarModeloFbx(ruta,manager){
  var fbx_loader = new THREE.FBXLoader(manager);
  // modelo estático fbx
  fbx_loader.load(ruta, function(object){
  object.scale.multiplyScalar(.1);
  scene.add(object);
  }, onProgress, onError);

}