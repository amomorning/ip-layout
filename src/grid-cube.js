import * as ARCH from "@inst-aaa/archiweb-core"
import * as THREE from "three";
import {token} from "@/sensitiveInfo"
import {store} from "@/store.js"
import {RemoveObjectCommand} from "@inst-aaa/archiweb-core";
import {MultiCmdsCommand} from "@inst-aaa/archiweb-core/src/commands/Commands";


let viewport = new ARCH.Viewport("ip-layout-ccdfdc", true , {selection: false});
let archijson = new ARCH.ArchiJSON(token);
let mt= new ARCH.MaterialFactory();

let scalar = 60;
let shift;

function around(val) {
  return Math.round(val/scalar/2)*scalar*2;
}

function getCorner(b) {
  return new THREE.Vector3(
    b.position.x - b.scale.x / 2,
    b.position.y - b.scale.y / 2,
    b.position.z)
}

function getShiftVector(box) {
  let pos = new THREE.Vector3().copy(box[0].position);
  
  box.forEach(b => pos = pos.min(getCorner(b)) );
  
  return pos.divideScalar(scalar);
}


function generateDomain (box) {
  
  shift = getShiftVector(box).toArray();
  // console.log("shift", shift);
  
  let st = new Set();
  box.forEach(b => {
    let corner = getCorner(b).divideScalar(scalar).toArray();
    let scale = new THREE.Vector3().copy(b.scale).divideScalar(scalar).toArray();
    
    for (let i = 0; i < 3; ++ i) {
      corner[i] -= shift[i];
    }
    for (let x = corner[0]; x < corner[0] + scale[0] ; ++ x ) {
      for (let y = corner[1]; y < corner[1] + scale[1]; ++ y) {
        for (let z = corner[2]; z < corner[2] + scale[2]; ++ z) {
          st.add([x,y,z].join());
        }
      }
    }
    
  })
  
  let arr = Array.from(st);
  return arr.map(str =>
    str.split(",").map(Number)
  );
  
}

function initArchiJSON() {
  store.sendData = () => {
    console.log('overlay')
    viewport.signals.overlayStarted.dispatch("loading...")
    // viewport.signals.overlayStarted.dispatch();
    
    viewport.changeLayer('box');
    let domain = generateDomain(viewport.objects);
    archijson.sendArchiJSON('ip', [], { domain:domain, templates: store.templates,})
    
  }
  
  store.revert = () => {
    viewport.changeLayer('default');
    viewport.signals.sceneChanged.active = false;
    let cmdArray = [];
    for(let o of viewport.objects){
      cmdArray.push(new RemoveObjectCommand(viewport, o))
    }
    let cmd = new MultiCmdsCommand(viewport, cmdArray);
    viewport.execute(cmd);
  
    viewport.signals.sceneChanged.active = true;
    viewport.changeLayer('box');
    
    viewport.objects.forEach(b => b.visible = true);
    viewport.option.autosave = true;
  }
  
  archijson.onReceive = function(body) {
    viewport.option.autosave = false;
    viewport.changeLayer('box')
    viewport.objects.forEach(b => b.visible = false);
    
    viewport.signals.sceneChanged.active = false;
    let len = body.ks.length;
    
    for(let i = 0; i < len; ++ i) {
      let out = new THREE.Group();
      viewport.scene.add(out);
  
      let cube = new THREE.Group();
      let c =  store.colors[body.ks[i]];
      let t = store.templates[body.ks[i]];
      for (let j = 0; j < t.length; ++ j) {
        
        let p = [body.ps[i][0] + t[j][0] + shift[0] + 0.5,
          body.ps[i][1] + t[j][1] + shift[1] +  0.5,
          body.ps[i][2] + t[j][2] + shift[2]];
        
        cube.add(new ARCH.Cuboid(viewport, p, [1, 1, 1], {material: mt.Glass(c)}));
      }
      cube.scale.set(scalar, scalar, scalar);
      out.add(cube);
    }
  
    viewport.changeLayer('default');
    viewport.signals.sceneChanged.active = true;
    viewport.signals.overlayFinished.dispatch();
  }
}

function initScene() {
  let b1 = new ARCH.Cuboid(viewport, [180, 180, 0], [360, 360, 600]);
  viewport.removeObjectLayer(b1, 'default');
  viewport.addObjectLayer(b1, 'box');
  let b2 = new ARCH.Cuboid(viewport, [300, 300, 480], [240, 240, 240]);
  viewport.removeObjectLayer(b2, 'default');
  viewport.addObjectLayer( b2 , 'box');
  viewport.changeLayer('box');
  let b3 = new ARCH.Cuboid(viewport, [420, 420, 0], [240, 600, 240]);
  viewport.removeObjectLayer(b3, 'default');
  viewport.addObjectLayer( b3 , 'box');
  viewport.changeLayer('box');
  let b4 = new ARCH.Cuboid(viewport, [-180, 300, 0], [600, 240, 240]);
  viewport.removeObjectLayer(b4, 'default');
  viewport.addObjectLayer( b4 , 'box');
  viewport.changeLayer('box');
}

function onWindowResize() {
  viewport.signals.windowResize.dispatch();
}


function main() {
  
  
  
  viewport.transformer.draggingChanged = function (o, v) {
    if(!v && o.type === 'Cuboid') {
      
      o.scale.x = around(o.scale.x);
      o.scale.y = around(o.scale.y);
      o.scale.z = around(o.scale.z);
    }
  }
  
  viewport.option.grid = scalar;
  viewport.option.snap = true;
  
  
  // console.log(colors.length)
  initScene();
  initArchiJSON();
  store.bindMain = () => {
    window.viewport = viewport;
  
    if(window.resizeFunc) {
      window.removeEventListener('resize', window.resizeFunc);
    }
    window.resizeFunc = onWindowResize;
    window.addEventListener('resize', onWindowResize);
  }
  
}

export {main};