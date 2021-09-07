/* eslint-disable no-unused-vars,no-case-declarations */
import * as ARCH from "@inst-aaa/archiweb-core"

function main() {
  let viewport = new ARCH.Viewport();
  let cube = new ARCH.Cuboid(viewport, [0, 0, 0], [100, 100, 100]);
}

export {
  main
}
