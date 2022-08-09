class Turntable3d {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId); // Get the canvas element
        this.init()
    }

    init() {
        //init engine
        this.engine = new BABYLON.Engine(this.canvas, true);

        //init scene
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = BABYLON.Color4(0, 0, 0, 0)

        //init camera
        this.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 4, 0));
        this.camera.attachControl(this.canvas, true);
        this.camera.useAutoRotationBehavior = true;
        this.camera.autoRotationBehavior.idleRotationSpeed = 0.1

        //init lighting
        this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        this.light.diffuse = BABYLON.Color3.FromHexString('#fdfbd3');
        this.light.intensity = 5;


        //use this to disable zoom
        // this.camera.lowerRadiusLimit = 15;
        // this.camera.upperRadiusLimit = 15;


        BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/marlonsijnesael/obj-share-test/main/", "2stoelen-compressed2.glb").then((result) => {
            result.meshes[0]._scaling = new BABYLON.Vector3(-1, 1, 1);
            this.camera.target = result.meshes[0].position;
            result.meshes[0]

        })

        // Watch for browser/canvas resize events
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        //init renderloop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}