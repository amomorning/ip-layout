import * as ARCH from "@inst-aaa/archiweb-core"
import {token} from "@/sensitiveInfo"
import {store} from "@/store.js"

let viewport = new ARCH.Viewport("ip-layout-ccdfdc", true );
let archijson = new ARCH.ArchiJSON(token);

let scale = 100;

function around(val) {
  return Math.round(val/scale)*scale;
}

function initArchiJSON() {
  
  store.sendData = () => {
    archijson.sendArchiJSON('ip', [], {templates: store.templates})
    
  }
  archijson.onReceive = function(body) {
    console.log(body);
  }
}

function main() {
  new ARCH.Cuboid(viewport, [0, 0, 0], [300, 100, 300])
  // viewport.objects.push(cube);
  viewport.transformer.draggingChanged = function (o, v) {
    if(!v && o.type === 'Cuboid') {
      o.scale.x = around(o.scale.x);
      o.scale.y = around(o.scale.y);
      o.scale.z = around(o.scale.z);
    }
  }
  
  // console.log(colors.length)
  initArchiJSON();
  
}

export {main};