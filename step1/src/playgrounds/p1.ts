// playground 1
// https://playground.babylonjs.com/

export default function createScene(canvas: HTMLCanvasElement) {
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.FreeCamera(
    "Camera",
    new BABYLON.Vector3(0, 10, -10),
    scene
  );
  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  light.intensity = 0.7;

  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );

  sphere.position.y = 1;

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 12, height: 6 },
    scene
  );
  const groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
  ground.material = groundMaterial;
  // const groundTexture = new BABYLON.Texture(BABYLON.Asset)
  (ground.material as any).diffuseColor = BABYLON.Color3.Red();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });

  return scene;
}
