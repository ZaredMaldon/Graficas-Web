function setupScene() {
        clock = new THREE.Clock();
        scene = new THREE.Scene();
        scene2 = new THREE.Scene();

        createCamera();
        createCamera();

        cameras[0].position.set(0, 20, 0);
        cameras[1].position.set(0, 20, 0);
        cameras[0].rotation.x = THREE.Math.degToRad(-90);
        cameras[1].rotation.x = THREE.Math.degToRad(-90);

        createRenderer(new THREE.Color(0, 0, 0));
        createRenderer(new THREE.Color(0.2, 0.2, 0.2));

        var ambientLight = new THREE.AmbientLight(
                new THREE.Color(1, 1, 1),
                1.0
        );
        var ambientLight2 = ambientLight.clone();
        scene.add(ambientLight);
        scene2.add(ambientLight2);

        var directionalLight = new THREE.DirectionalLight(
                new THREE.Color(1, 1, 0),
                0.4
        );
        directionalLight.position.set(0, 0, 1);
        var directionalLight2 = directionalLight.clone();
        scene.add(directionalLight);
        scene2.add(directionalLight2);

        var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
        grid.position.y = -1;
        //scene.add(grid);
        //scene2.add(grid);

        var material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(0.5, 0.0, 0.0),
        });
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        var player1 = new THREE.Mesh(geometry, material);
        player1.position.y = 10;
        player1.scale.set(5, 5, 5);

        var player2 = player1.clone();
        player2.material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(0.5, 0.5, 0.0),
        });

        player1.rayos = [
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(0, -1, 0)

        ];
        player2.rayos = [
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(0, -1, 0)

        ];

        scene.add(player1);
        scene2.add(player2);

        players.push(player1);
        players.push(player2);

        player1.yaw = 0;
        player1.forward = 0;

        player2.yaw = 0;
        player2.forward = 0;

        $("#scene-section").append(renderers[0].domElement);
        $("#scene-section-2").append(renderers[1].domElement);
}

function createCamera() {/*
        var camera = new THREE.PerspectiveCamera(
            75,
            visibleSize.width / visibleSize.height,
            0.1,
            100
        );*/
        var radio = visibleSize.width / visibleSize.height;
        var viewSize = 100;
        var camera = new THREE.OrthographicCamera(-radio * viewSize / 4, radio * viewSize / 4, viewSize / 2, -viewSize / 2, 0.1, 2000);
        cameras.push(camera);
}

function createRenderer(color) {
        var renderer = new THREE.WebGLRenderer({ precision: "mediump", alpha: true, });
        renderer.setPixelRatio(visibleSize.width / 2 / visibleSize.height);
        renderer.setSize(visibleSize.width / 2, visibleSize.height);
        renderers.push(renderer);
}