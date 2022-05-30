import React from "react";
import * as BABYLON from "babylonjs";
import "./app.css";
import p1 from "./playgrounds/p1";
import p2 from "./playgrounds/p2";

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    if (canvasRef.current) {
      p1(canvasRef.current);
    }
  });
  return (
    <div className="App">
      <canvas ref={canvasRef} className="Canvas" />
    </div>
  );
}

export default App;

function createScene(canvas: HTMLCanvasElement) {
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 1),
    scene
  );

  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "https://assets.babylonjs.com/meshes/",
    "both_houses_scene.babylon"
  ).then((result) => {
    const house1 = scene.getMeshByName("detached_house");
    house1!.position!.y = 2;
    const house2 = result.meshes[2];
    house2.position.y = 1;
  });

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });

  return scene;
}
