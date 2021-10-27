import * as ARCH from "@inst-aaa/archiweb-core"
import * as THREE from "three";
import {token} from "@/sensitiveInfo"
import {store} from "@/store.js"

let viewport = new ARCH.Viewport("ip-layout-ccdfdc", true , {selection: false});
let archijson = new ARCH.ArchiJSON(token);
let mt= new ARCH.MaterialFactory();

let box = [];
let scalar = 60;
let shift;

function around(val) {
  return Math.round(val/scalar)*scalar;
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
  console.log("shift", shift);
  
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
    
    let domain = generateDomain(box);
    
    archijson.sendArchiJSON('ip', [], { domain:domain, templates: store.templates,})
    
  }
  archijson.onReceive = function(body) {
    
    viewport.signals.sceneChanged.active = false;
    for(let o of viewport.objects) {
      viewport.removeObject(o);
    }
    
    let len = body.ks.length;
    
    for(let i = 0; i < len; ++ i) {
      let out = new THREE.Group();
      viewport.scene.add(out);
  
      let cube = new THREE.Group();
      let c =  store.colors[body.ks[i]];
      let t = store.templates[body.ks[i]];
      for (let j = 0; j < t.length; ++ j) {
        
        let p = [body.ps[i][0] + t[j][0] + shift[0] + 0.5, body.ps[i][1] + t[j][1] + shift[1] +  0.5, body.ps[i][2] + t[j][2] + shift[2]];
        
        cube.add(new ARCH.Cuboid(viewport, p, [1, 1, 1], {material: mt.Glass(c)}));
        
        
      }
      cube.scale.set(scalar, scalar, scalar);
      out.add(cube);
    }
    
    viewport.changeLayer(viewport.layer);
    viewport.signals.sceneChanged.active = true;
  }
}



function main() {
  box = [];
  box.push( new ARCH.Cuboid(viewport, [180, 180, 0], [360, 360, 600]) )
  box.push( new ARCH.Cuboid(viewport, [240, 240, 480], [240, 240, 240]) )
  // viewport.objects.push(cube);
  viewport.transformer.draggingChanged = function (o, v) {
    if(!v && o.type === 'Cuboid') {
      o.scale.x = around(o.scale.x);
      o.scale.y = around(o.scale.y);
      o.scale.z = around(o.scale.z);
    }
    generateDomain(box)
  }
  
  viewport.environment.gridUpdate(scalar);
  viewport.transformer.setTransformSnap(scalar);
  
  
  // console.log(colors.length)
  initArchiJSON();
}

export {main};