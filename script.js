let rnd = (l,u) => Math.random()*(u-l)+l;
let scene, camera, zone1, zone2, by, dy;
let door1, button1, open1;
let door2, door2r, button2, open2;
let lava;
let tv;
let lavaEnabled = false;
let initialButtonPress = false;
let initialButtonPress1 = false;
let victory;
let victory_trigger = true;
let cab;
window.onload = function(){
  
 scene = document.querySelector("a-scene");

 camera = new Player("a-camera");
    setTimeout(function () {
        lavaEnabled = true;
        console.log("deeeeeznuts");
      }, 5000); 

    
  setTimeout(loop,100);
  
  door1 = document.getElementById("door");
  button1 = document.getElementById("door_button");
  open1 = false;
    cab = document.getElementById("cabinet");
  
  button1.addEventListener("click", function() {
    if (open1) {
      button1.setAttribute("color", "red");
      open1 = false;
           button1.components.sound.playSound();
        cab.components.sound.playSound();
      initialButtonPress1 = true; 
    } else {          
      button1.setAttribute("color", "green");
      open1 = true;
      button1.components.sound.playSound();
      initialButtonPress1 = true; 
      door1.setAttribute("position", `-29.5 8.25 0`);
    }
  });

      door2r = document.getElementById("door2.1");
      door2 = document.getElementById("door2");
      button2 = document.getElementById("door_button2");
      open2 = false;
    
    button2.addEventListener("click", function() {
      if (open2) {
        button2.setAttribute("color", "red");
        open2 = false;
        button2.components.sound.playSound();
        initialButtonPress = true; 
      } else {          
        button2.setAttribute("color", "green");
        open2 = true;
        button2.components.sound.playSound();
        initialButtonPress = true; 
      }
    });

    let grav = document.getElementById("grav-box");
      grav.addEventListener("mousedown", function(){
      console.log(grav);
      grav.setAttribute("color", "yellow");
      man.setAttribute("spring","target: #grav-box; damping: 0.5; stiffness: 100;" );
      man.setAttribute("color", "blue");
    });  

    grav.addEventListener("mouseup", function(){
      console.log(grav);
      grav.setAttribute("color", "white");
      man.setAttribute("spring","target: #grav-box; damping: 0.0; stiffness: 0;" );
      man.setAttribute("color", "white");
    });



  let savebox1 = document.getElementById("savebox1");
  let savedPosition = null;
  window.pressed = {};

  window.addEventListener("keydown", (e) => {
      window.pressed[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
      window.pressed[e.key] = false;
      if (e.key === "1") {
          if (savedPosition === null) {
              if (camera?.driver?.object3D?.position) {
                  savedPosition = { 
                      x: camera.driver.object3D.position.x, 
                      y: camera.driver.object3D.position.y, 
                      z: camera.driver.object3D.position.z 
                  };
                  savebox1.setAttribute("value", "Save 1 (Saved)");
                  console.log("Saved:", savedPosition);
                  marker = document.createElement('a-sphere');
                  marker.setAttribute('radius', '0.5');
                  marker.setAttribute('color', 'red');
                  marker.setAttribute('position', `${savedPosition.x} ${savedPosition.y + 1.5} ${savedPosition.z}`);
                  marker.setAttribute('static-body', '');
                  scene.appendChild(marker);
              }
          } else {
              if (camera?.driver && camera?.obj) {
                  camera.driver.setAttribute("position", `${savedPosition.x} ${savedPosition.y} ${savedPosition.z}`);
                  camera.obj.setAttribute("position", `${savedPosition.x} ${savedPosition.y} ${savedPosition.z}`);
                  if (camera.driver.components["dynamic-body"]) {
                      camera.driver.components["dynamic-body"].syncToPhysics();
                  }
                  if (marker) {
                      marker.parentNode.removeChild(marker);
                      marker = null;
                  }
                  savedPosition = null; 
                  savebox1.setAttribute("value", "Save 1");
                  console.log("You got teleported lol");
              } 
          }
      }
  });

      camera.obj.setAttribute("position", {x:-50, y:2, z:30});
      camera.driver.setAttribute("position", {x:-50, y:1, z:30});
      camera.obj.setAttribute("rotation", {x:-50, y:90, z:30});
      camera.driver.setAttribute("rotation", {x:-50, y:90, z:30});
    
    window.addEventListener("keydown", (e) => {
        window.pressed[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
        window.pressed[e.key] = false;
        if (e.key === "5") {
            window.location.href = "index.html";
        }
    });

  let elevatorFloor = document.getElementById('elevatorfloor');
  let doorButton3 = document.getElementById('door_button3');
  let elevatorHeight = 0;
  let movingUp = false;
  let targetHeight = 20;
  let duration = 20000;
  let elevatorSpeed = targetHeight / duration;
  let startTime = null;

  doorButton3.addEventListener('click', function() {
      if (!movingUp) {
          doorButton3.setAttribute('color', 'green');
          movingUp = true;
          startTime = null; 
              doorButton3.components.sound.playSound();
          
           elevatorFloor.components.sound.playSound();

          
          requestAnimationFrame(moveElevatorUp);
      } else {
          doorButton3.setAttribute('color', 'red');
          movingUp = false;
          startTime = null; 
          doorButton3.components.sound.playSound();
          requestAnimationFrame(moveElevatorDown);
      }
  });

  function moveElevatorUp(timestamp) {
      if (!startTime) startTime = timestamp;

      let elapsedTime = timestamp - startTime;

      if (elapsedTime < duration) {
          elevatorHeight = elevatorSpeed * elapsedTime;
          elevatorFloor.setAttribute('position', `-7 ${elevatorHeight} -21`);
          requestAnimationFrame(moveElevatorUp);
      } else {
          elevatorHeight = targetHeight;
          elevatorFloor.setAttribute('position', `-7 ${elevatorHeight} -21`);
      }
  }

  function moveElevatorDown(timestamp) {
      if (!startTime) startTime = timestamp;

      let elapsedTime = timestamp - startTime;

      if (elapsedTime < duration) {
          elevatorHeight = targetHeight - (elevatorSpeed * elapsedTime);
          elevatorFloor.setAttribute('position', `-7 ${elevatorHeight} -21`);
          requestAnimationFrame(moveElevatorDown);
      } else {
          elevatorHeight = 0;
          elevatorFloor.setAttribute('position', `-7 ${elevatorHeight} -21`);
      }
  }

    victory = document.getElementById("ending");

  
}

function loop(){
  camera.update();
  by = 40;
  if (lavaEnabled) {
      let lava = document.getElementById("lava");
      let isTouchingLava = isPlayerInsideBox(lava, camera.driver);
      //console.log("Player touching lava:", isTouchingLava);
      if (isTouchingLava) {
          console.log("Player touched lava");
          camera.obj.setAttribute("position", { x: -87, y: 6.6, z: -14.4 });
          camera.driver.setAttribute("position", { x: -87, y: 6.6, z: -14.4 });
          lava.components.sound.playSound();
      }
  }
    
  let a = door1.object3D.position.z;
  let b = 0.1;
  if (open1) {
      a += b;
      door1.setAttribute("position", `-29.5 8.25 ${a}`);
      if (a >= 50) {
          b = 0;
      }
  }
      let y = door2.object3D.position.y;
      let dy = 0.1;

      let y2 = door2r.object3D.position.y;
      let d2 = 0.1;
      if (open2) {
        y += dy;
        door2.setAttribute("position", `-7.5 ${y} -22`);
        if (y >= 10) {
          dy = 0;
        }

        y2 += d2;
        door2r.setAttribute("position", `-7.5 ${y2} -37`);
        if (y2 >= 2.5) {
          d2 = 0;
        door2r.setAttribute("position", `-7.5 2.5 -37`);
        }
      } else if (initialButtonPress) {
        dy = -0.1;
        d2 = -0.1;


        door2.setAttribute("position", `-7.5 5 -22`);


        y2 += d2;
        door2r.setAttribute("position", `-7.5 -2.5 -37`);
        if (y2 <= -2.5) {
          d2 = 0;
          door2r.setAttribute("position", `-7.5 -2.5 -37`);
        }
      }

    if((distance(camera.obj, victory) <= 2.3) && (victory_trigger)){
        victory_trigger = false;
        console.log(victory)
        
        
    }
    

  if(distance(button,camera.obj ) <= 2.3){
    dy = -0.01
    by += dy
    if (by < 1){
      dy = 0
    }
    button.setAttribute("position", `50 3 ${by} `);
    button.setAttribute("color", "green");
  }
  if(distance(button,camera.obj) > 1.9){
    dy = 0.1
    by += dy;
    if (by >= 3){
      dy = 0
    }
    button.setAttribute("position", `50 3 ${by}`);
    button.setAttribute("color", "red");
  }
  //zone1.die();
  //zone2.die();
  window.requestAnimationFrame( loop );
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}

function isPlayerInsideBox(box, player) {
    let boxPosition = box.object3D.position;
    let boxRotation = box.object3D.rotation;
    let boxSize = {
        width: box.getAttribute("width"),
        height: box.getAttribute("height"),
        depth: box.getAttribute("depth")
    };

    let playerPosition = player.object3D.position;

    let rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(boxRotation);
    let playerRelativePosition = playerPosition.clone().sub(boxPosition);
    playerRelativePosition.applyMatrix4(rotationMatrix.clone().invert());

    return Math.abs(playerRelativePosition.x) <= boxSize.width / 2 &&
           Math.abs(playerRelativePosition.y) <= boxSize.height / 2 &&
           Math.abs(playerRelativePosition.z) <= boxSize.depth / 2;
}
