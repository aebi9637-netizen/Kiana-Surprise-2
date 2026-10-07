import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


/* =====================================================
   SCENE
===================================================== */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020204);


/* =====================================================
   CAMERA
===================================================== */

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 1.7, 7);


/* =====================================================
   RENDERER
===================================================== */

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("scene"),
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;


/* =====================================================
   LIGHT
===================================================== */

const ambientLight = new THREE.AmbientLight(
    0x3a3035,
    0.35
);

scene.add(ambientLight);


const pointLight = new THREE.PointLight(
    0xff6688,
    12,
    12
);

pointLight.position.set(0, 3, 1);
pointLight.castShadow = true;

scene.add(pointLight);


/* =====================================================
   FLOOR
===================================================== */

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 14),

    new THREE.MeshStandardMaterial({
        color: 0x151116,
        roughness: 0.8
    })
);

floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;

scene.add(floor);


/* =====================================================
   WALLS
===================================================== */

const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x100c10,
    roughness: 0.9
});


const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(14, 6, 0.3),
    wallMaterial
);

backWall.position.set(0, 3, -5);

scene.add(backWall);


const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 6, 10),
    wallMaterial
);

leftWall.position.set(-7, 3, 0);

scene.add(leftWall);


const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 6, 10),
    wallMaterial
);

rightWall.position.set(7, 3, 0);

scene.add(rightWall);


/* =====================================================
   TABLE
===================================================== */

const tableMaterial = new THREE.MeshStandardMaterial({
    color: 0x24181c,
    roughness: 0.65
});


const tableTop = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 0.35, 2.2),
    tableMaterial
);

tableTop.position.set(0, 1.8, -1);

tableTop.castShadow = true;
tableTop.receiveShadow = true;

scene.add(tableTop);


/* =====================================================
   TABLE LEGS
===================================================== */

for (const x of [-1.9, 1.9]) {

    for (const z of [-1.8, -0.2]) {

        const leg = new THREE.Mesh(
            new THREE.BoxGeometry(
                0.25,
                1.8,
                0.25
            ),

            tableMaterial
        );

        leg.position.set(
            x,
            0.9,
            z
        );

        leg.castShadow = true;

        scene.add(leg);
    }
}


/* =====================================================
   GIFT
===================================================== */

const giftMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b183c,
    roughness: 0.45,
    metalness: 0.05
});


const gift = new THREE.Mesh(
    new THREE.BoxGeometry(
        1.35,
        0.8,
        1.35
    ),

    giftMaterial
);

gift.position.set(
    0,
    2.35,
    -1
);

gift.castShadow = true;

scene.add(gift);


/* =====================================================
   GIFT LID
===================================================== */

const giftLid = new THREE.Mesh(
    new THREE.BoxGeometry(
        1.48,
        0.25,
        1.48
    ),

    giftMaterial
);

giftLid.position.set(
    0,
    2.88,
    -1
);

giftLid.castShadow = true;

scene.add(giftLid);


/* =====================================================
   RIBBON
===================================================== */

const ribbonMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd1dc,
    roughness: 0.35
});


const ribbonVertical = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.16,
        0.85,
        1.4
    ),

    ribbonMaterial
);

ribbonVertical.position.set(
    0,
    2.35,
    -1
);

scene.add(ribbonVertical);


const ribbonTop = new THREE.Mesh(
    new THREE.BoxGeometry(
        0.16,
        0.28,
        1.5
    ),

    ribbonMaterial
);

ribbonTop.position.set(
    0,
    2.88,
    -1
);

scene.add(ribbonTop);


/* =====================================================
   HEART
===================================================== */

const heartShape = new THREE.Shape();

heartShape.moveTo(0, 0.35);

heartShape.bezierCurveTo(
    -0.5,
    0.9,
    -1.2,
    0.55,
    -0.65,
    -0.15
);

heartShape.bezierCurveTo(
    -0.3,
    -0.55,
    0,
    -0.8,
    0,
    -1.05
);

heartShape.bezierCurveTo(
    0,
    -0.8,
    0.3,
    -0.55,
    0.65,
    -0.15
);

heartShape.bezierCurveTo(
    1.2,
    0.55,
    0.5,
    0.9,
    0,
    0.35
);


const heartGeometry = new THREE.ExtrudeGeometry(
    heartShape,
    {
        depth: 0.35,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize: 0.08,
        bevelThickness: 0.08
    }
);


const heartMaterial = new THREE.MeshStandardMaterial({
    color: 0xff174f,
    emissive: 0x660018,
    emissiveIntensity: 1.5,
    roughness: 0.25,
    metalness: 0.1
});


const heart = new THREE.Mesh(
    heartGeometry,
    heartMaterial
);

heart.scale.set(
    0.45,
    0.45,
    0.45
);

heart.position.set(
    0,
    2.75,
    -1
);

heart.visible = false;

scene.add(heart);


/* =====================================================
   HEART LIGHT
===================================================== */

const heartLight = new THREE.PointLight(
    0xff174f,
    0,
    5
);

heartLight.position.set(
    0,
    3.5,
    -1
);

scene.add(heartLight);


/* =====================================================
   CAMERA LOOK
===================================================== */

let targetRotationX = 0;
let targetRotationY = 0;

let lookActive = false;

let lastLookX = 0;
let lastLookY = 0;


/* =====================================================
   MOBILE CAMERA
===================================================== */

window.addEventListener(
    "touchstart",
    function (event) {

        if (event.touches.length !== 1) {
            return;
        }

        const touch = event.touches[0];

        if (
            touch.clientX >
            window.innerWidth * 0.35
        ) {

            lookActive = true;

            lastLookX = touch.clientX;
            lastLookY = touch.clientY;
        }
    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchmove",
    function (event) {

        if (
            !lookActive ||
            event.touches.length !== 1
        ) {
            return;
        }

        const touch = event.touches[0];

        const deltaX =
            touch.clientX - lastLookX;

        const deltaY =
            touch.clientY - lastLookY;


        targetRotationY -=
            deltaX * 0.003;

        targetRotationX +=
            deltaY * 0.002;


        targetRotationY =
            THREE.MathUtils.clamp(
                targetRotationY,
                -0.8,
                0.8
            );


        targetRotationX =
            THREE.MathUtils.clamp(
                targetRotationX,
                -0.5,
                0.5
            );


        lastLookX = touch.clientX;
        lastLookY = touch.clientY;
    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchend",
    function () {

        lookActive = false;
    }
);


/* =====================================================
   JOYSTICK
===================================================== */

const joystickArea =
    document.getElementById("joystickArea");

const joystickKnob =
    document.getElementById("joystickKnob");


let joystickActive = false;

let joystickX = 0;
let joystickY = 0;

const joystickRadius = 31;


/* =====================================================
   JOYSTICK START
===================================================== */

joystickArea.addEventListener(
    "touchstart",
    function (event) {

        event.stopPropagation();

        if (event.touches.length !== 1) {
            return;
        }

        joystickActive = true;

        updateJoystick(
            event.touches[0]
        );
    },
    {
        passive: false
    }
);


/* =====================================================
   JOYSTICK MOVE
===================================================== */

joystickArea.addEventListener(
    "touchmove",
    function (event) {

        event.preventDefault();

        event.stopPropagation();

        if (
            !joystickActive ||
            event.touches.length !== 1
        ) {
            return;
        }

        updateJoystick(
            event.touches[0]
        );
    },
    {
        passive: false
    }
);


/* =====================================================
   JOYSTICK END
===================================================== */

joystickArea.addEventListener(
    "touchend",
    function () {

        resetJoystick();
    }
);


function updateJoystick(touch) {

    const rect =
        joystickArea.getBoundingClientRect();


    const centerX =
        rect.left +
        rect.width / 2;


    const centerY =
        rect.top +
        rect.height / 2;


    let dx =
        touch.clientX -
        centerX;


    let dy =
        touch.clientY -
        centerY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    if (
        distance >
        joystickRadius
    ) {

        dx =
            dx /
            distance *
            joystickRadius;


        dy =
            dy /
            distance *
            joystickRadius;
    }


    joystickX =
        dx /
        joystickRadius;


    joystickY =
        dy /
        joystickRadius;


    joystickKnob.style.transform =
        "translate(" +
        dx +
        "px, " +
        dy +
        "px)";
}


function resetJoystick() {

    joystickActive = false;

    joystickX = 0;
    joystickY = 0;

    joystickKnob.style.transform =
        "translate(0px, 0px)";
}


/* =====================================================
   MOVEMENT
===================================================== */

const moveSpeed = 0.035;


function updateMovement() {

    const forward =
        -joystickY *
        moveSpeed;


    const right =
        joystickX *
        moveSpeed;


    camera.position.x +=
        Math.sin(
            camera.rotation.y
        ) *
        forward;


    camera.position.z +=
        Math.cos(
            camera.rotation.y
        ) *
        forward;


    camera.position.x +=
        Math.cos(
            camera.rotation.y
        ) *
        right;


    camera.position.z -=
        Math.sin(
            camera.rotation.y
        ) *
        right;


    /* =================================================
       ROOM LIMITS
    ================================================= */

    camera.position.x =
        THREE.MathUtils.clamp(
            camera.position.x,
            -5.8,
            5.8
        );


    camera.position.z =
        THREE.MathUtils.clamp(
            camera.position.z,
            -4.2,
            5.5
        );


    /* =================================================
       TABLE COLLISION
    ================================================= */

    const tableMinX = -2.45;
    const tableMaxX = 2.45;

    const tableMinZ = -2.25;
    const tableMaxZ = 0.25;


    if (
        camera.position.x > tableMinX &&
        camera.position.x < tableMaxX &&
        camera.position.z > tableMinZ &&
        camera.position.z < tableMaxZ
    ) {

        const left =
            Math.abs(
                camera.position.x -
                tableMinX
            );


        const right =
            Math.abs(
                camera.position.x -
                tableMaxX
            );


        const front =
            Math.abs(
                camera.position.z -
                tableMaxZ
            );


        const back =
            Math.abs(
                camera.position.z -
                tableMinZ
            );


        const smallest =
            Math.min(
                left,
                right,
                front,
                back
            );


        if (smallest === left) {

            camera.position.x =
                tableMinX;

        }
        else if (smallest === right) {

            camera.position.x =
                tableMaxX;

        }
        else if (smallest === front) {

            camera.position.z =
                tableMaxZ;

        }
        else {

            camera.position.z =
                tableMinZ;
        }
    }
}


/* =====================================================
   CAMERA UPDATE
===================================================== */

function updateCamera() {

    camera.rotation.y +=
        (
            targetRotationY -
            camera.rotation.y
        ) * 0.08;


    camera.rotation.x +=
        (
            -targetRotationX -
            camera.rotation.x
        ) * 0.08;
}


/* =====================================================
   GIFT
===================================================== */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

let giftOpened = false;

const heartTargetY = 4.8;

let cinematicStarted = false;


function interactWithGift(
    clientX,
    clientY
) {

    if (giftOpened) {
        return;
    }


    mouse.x =
        (clientX /
            window.innerWidth) *
            2 - 1;


    mouse.y =
        -(clientY /
            window.innerHeight) *
            2 + 1;


    raycaster.setFromCamera(
        mouse,
        camera
    );


    const hits =
        raycaster.intersectObjects([
            gift,
            giftLid
        ]);


    if (hits.length === 0) {
        return;
    }


    giftOpened = true;


    giftLid.position.y += 1.2;

    giftLid.rotation.x =
        -0.35;


    ribbonTop.position.y += 1.2;

    ribbonTop.rotation.x =
        -0.35;


    heart.visible = true;

    heart.position.set(
        0,
        2.75,
        -1
    );


    const giftLight =
        new THREE.PointLight(
            0xffb6d0,
            0,
            5
        );

    giftLight.position.set(
        0,
        3,
        -1
    );

    scene.add(giftLight);


    let lightIntensity = 0;


    const lightAnimation =
        setInterval(
            function () {

                lightIntensity += 0.35;

                giftLight.intensity =
                    lightIntensity;

                heartLight.intensity =
                    lightIntensity * 0.45;


                if (
                    lightIntensity >= 8
                ) {

                    giftLight.intensity = 8;

                    heartLight.intensity = 4;

                    clearInterval(
                        lightAnimation
                    );
                }

            },
            40
        );
}


/* =====================================================
   DESKTOP CLICK
===================================================== */

window.addEventListener(
    "click",
    function (event) {

        interactWithGift(
            event.clientX,
            event.clientY
        );
    }
);


/* =====================================================
   MOBILE TAP
===================================================== */

let tapStartX = 0;
let tapStartY = 0;


window.addEventListener(
    "touchstart",
    function (event) {

        if (event.touches.length !== 1) {
            return;
        }

        tapStartX =
            event.touches[0].clientX;

        tapStartY =
            event.touches[0].clientY;
    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchend",
    function (event) {

        if (
            event.changedTouches.length !== 1
        ) {
            return;
        }


        const endX =
            event.changedTouches[0].clientX;

        const endY =
            event.changedTouches[0].clientY;


        const distance =
            Math.sqrt(
                Math.pow(
                    endX - tapStartX,
                    2
                ) +
                Math.pow(
                    endY - tapStartY,
                    2
                )
            );


        if (
            distance < 25 &&
            endX >
            window.innerWidth * 0.35
        ) {

            interactWithGift(
                endX,
                endY
            );
        }
    },
    {
        passive: true
    }
);


/* =====================================================
   RESIZE
===================================================== */

window.addEventListener(
    "resize",
    function () {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );
    }
);


/* =====================================================
   LOADING
===================================================== */

setTimeout(
    function () {

        const loading =
            document.getElementById(
                "loading"
            );


        if (loading) {

            loading.style.opacity =
                "0";


            setTimeout(
                function () {

                    loading.style.display =
                        "none";

                },
                1000
            );
        }

    },
    1200
);


/* =====================================================
   ANIMATION
===================================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    /* =================================================
       GIFT ROTATION
    ================================================= */

    if (!giftOpened) {

        gift.rotation.y += 0.002;
    }


    /* =================================================
       HEART
    ================================================= */

    if (heart.visible) {

        heart.position.y +=
            (
                heartTargetY -
                heart.position.y
            ) * 0.025;


        heart.position.x =
            Math.sin(
                Date.now() * 0.002
            ) * 0.08;


        heart.rotation.y += 0.01;


        if (
            !cinematicStarted &&
            heart.position.y > 4.65
        ) {

            cinematicStarted = true;


            const cinematicText =
                document.getElementById(
                    "cinematicText"
                );


            const cinematicLine2 =
                document.getElementById(
                    "cinematicLine2"
                );


            if (cinematicText) {

                cinematicText.style.opacity =
                    "1";
            }


            setTimeout(
                function () {

                    if (cinematicLine2) {

                        cinematicLine2.style.opacity =
                            "1";
                    }

                },
                1800
            );
        }
    }


    /* =================================================
       MOVEMENT
    ================================================= */

    updateMovement();


    /* =================================================
       CAMERA
    ================================================= */

    updateCamera();


    /* =================================================
       RENDER
    ================================================= */

    renderer.render(
        scene,
        camera
    );
}


animate();
