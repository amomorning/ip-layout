/* eslint-disable no-unused-vars,no-case-declarations */
import * as THREE from "three";
import * as ARCH from "@inst-aaa/archiweb-core"
// use the token hidden in a file sensitiveInfo.js
import {store} from "@/store.js";

let viewport = new ARCH.Viewport('ip-template-ccdfdc', false, {
  selection: false,
});

let templates = [[[0, 0, 0], [1, 0, 0], [0, 1, 0]], [[0, 0, 0], [-1, 0, 0], [0, -1, 0]], [[0, 1, 0], [0, 0, 0], [0, -1, 0]], [[1, 0, 0], [0, 0, 0], [-1, 0, 0]], [[0, 0, 0], [1, 0, 0], [0, 0, 1]], [[0, 0, 0], [1, 0, 0], [0, 0, -1]], [[0, 0, 0], [-1, 0, 0], [0, 0, 1]], [[0, 0, 0], [-1, 0, 0], [0, 0, -1]], [[0, 0, 0], [0, 1, 0], [0, 0, 1]], [[0, 0, 0], [0, 1, 0], [0, 0, -1]], [[0, 0, 0], [0, -1, 0], [0, 0, 1]], [[0, 0, 0], [0, -1, 0], [0, 0, -1]], [[0, 0, -1], [0, 0, 0], [0, 0, 1]], [[0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 1, 0], [0, 1, 1], [0, 1, 2], [0, 2, 0], [0, 2, 1], [0, 2, 2], [1, 0, 0], [1, 0, 1], [1, 0, 2], [1, 1, 0], [1, 1, 1], [1, 1, 2], [1, 2, 0], [1, 2, 1], [1, 2, 2], [2, 0, 0], [2, 0, 1], [2, 0, 2], [2, 1, 0], [2, 1, 1], [2, 1, 2], [2, 2, 0], [2, 2, 1], [2, 2, 2]]];

let colors = [];

let scale = 60;

let mt = new ARCH.MaterialFactory();

function drawTemplate(temp, i) {
  let height = (i-Math.floor(templates.length/2))*4;
  let out = new THREE.Group();
  let cubes = new THREE.Group();
  
  viewport.scene.add(out);
  
  for(let it of temp) {
    let cube = new ARCH.Cuboid(viewport, it, [1, 1, 1], {material: mt.Matte(colors[i])});
    cubes.add(cube);
  }
  
  cubes.scale.set(scale, scale, scale);
  cubes.position.x = height*scale;
  out.add(cubes);
  
  out.userData.id = i;
  
}

function randomColor() {
  return new THREE.Color().setHSL(Math.random(), 0.4, 0.7).getHex();
}


function draw() {
  viewport.clear();
  for (let i = 0; i < templates.length; ++ i) {
    drawTemplate(templates[i], i);
  }
  viewport.changeLayer(viewport.layer);
  store.templates = templates;
}

function generateColor() {
  for(let i = 0; i < templates.length; ++ i) {
    colors[i] = randomColor();
  }
  store.colors = colors;
}


function main() {
  
  viewport.scene.background.color = new THREE.Color(255);
  viewport.environment.skyColorUpdate(false);
  viewport.environment.lightOnly();
  // initArchiJSON()
  generateColor();
  draw();
  
  viewport.signals.sceneChanged.dispatch();
  
  viewport.transformer.objectChanged = function(o) {
    if(o && o.userData.id !== undefined) {
  
      store.DragCard.id = o.userData.id;
      let spstr = JSON.stringify(templates[o.userData.id]).split('],');
      let jstr = spstr.join('],\n');
      store.DragCard.content = jstr;
      store.DragCard.show = true;
      // console.log(o.userData.id);
    } else {
      store.DragCard.show = false;
    }
  }
  viewport.transformer.control.showX = false;
  viewport.transformer.control.showY = false;
  viewport.transformer.control.showZ = false;
  
  store.deleteTemplate = function(id) {
    templates.splice(id, 1);
    colors.splice(id, 1);
    draw();
  }
  
  store.createTemplate = function(content) {
    let arr = eval(content);
    templates.push(arr);
    colors.push(randomColor());
    
    draw();
  }
  
  store.changeColor = function() {
    generateColor();
    draw();
  }
  
  store.bindTemplate = () => {
    window.viewport = viewport;
  }
}

export {
  main,
}
