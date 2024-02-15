
let gameStart=true;


// document.addEventListener("keypress",function(event){
//   console.log("inside first if condition");
//   if(event.key=="Enter"){
//     console.log("Enter was pressed");
//     gameStart=true;
//     requestAnimationFrame(gameLoop);
//   }
  
// });


    if(localStorage.getItem("maxScore")!=undefined){
      alert("Rod 1 has maximum score of "+localStorage.getItem(("maxScore")));
    }
    else{
      alert("this is your first time");
    }


let rodTop=document.getElementById("rod-top");
let rodBottom=document.getElementById("rod-bottom");
let ball=document.getElementById("ball");
let gameContainer=document.getElementById("game-container");
let aPressed=false;
let dPressed=false;
let score=0;
let gameStart = false;
let gameRunning = false;


// document.addEventListener("keypress",function(){
//   console.log("clicked");
// });

document.addEventListener("keypress",rightKeyHandler);
document.addEventListener("keyup",leftKeyHandler);

function rightKeyHandler(event){
  if(event.key=="d"){
    dPressed=true;
    console.log("d pressed");
  }
  else if(event.key=="a"){
    aPressed=true;
    console.log("a pressed");
  }
}

function leftKeyHandler(event){
  if(event.key=="d"){
    dPressed=false;
    console.log("d released");
  }
  else if(event.key=="a"){
    aPressed=false;
    console.log("a released");
  }
}

// For the velocity of the ball it is 2d, it will have a x component and a y component
// we will update the position of the ball by adding the velocity to the position of the ball
//we will also check if the ball is hitting the wall or rod, it will change the direction of the ball.
// The formula for the same would be v2=vx2+vy2;

if(gameStart){
let Vx=-1;
let Vy=-5;
let Vel=Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2));

function playAgain(){
  ball.style.left="50%";
  ball.style.top="50%";
  Vx=-1;
  Vy=-5;
  Vel=Math.sqrt(Math.pow(Vx,2)+Math.pow(Vy,2));
}

function checkCollission(activepaddle){
      let balltop=ball.offsetTop;
      let ballbottom=ball.offsetTop+ball.offsetHeight;
      let ballleft=ball.offsetLeft;
      let ballright=ball.offsetLeft+ball.offsetWidth;

      let paddletop=activepaddle.offsetTop;
      let paddlebottom=activepaddle.offsetTop+activepaddle.offsetHeight;
      let paddleleft=activepaddle.offsetLeft;
      let paddleright=activepaddle.offsetLeft+activepaddle.offsetWidth;

      // console.log(balltop,ballbottom,ballleft,ballright);

      // console.log(paddlebottom,paddletop,paddleleft,paddleright);
      if(ballbottom>paddletop && balltop<paddlebottom && ballright>paddleleft && ballleft<paddleright){
        // console.log("collision detected");
        return true;
      }
       else return false;
}    

function gameLoop(){
  if (gameRunning) {
  if(ball.offsetLeft<0){
    Vx=-Vx;
  }
  if(ball.offsetLeft>gameContainer.offsetWidth-ball.offsetWidth){
    Vx=-Vx;
  }
  if(ball.offsetTop<0){
    if(score>localStorage.getItem("maxScore"))
    localStorage.setItem("maxScore",score);

    playAgain();
}
  if(ball.offsetTop>gameContainer.offsetHeight-ball.offsetHeight){
    if(score>localStorage.getItem("maxScore"))
    localStorage.setItem("maxScore",score);
    playAgain();
  }
  let rod=ball.offsetTop>gameContainer.offsetHeight/2?rodBottom:rodTop;
  let ballcenterX=ball.offsetLeft+ball.offsetWidth/2;
  let paddlecenterX=rod.offsetLeft+rod.offsetWidth/2;
  let angle=0;
  if(checkCollission(rod)){
    score++;
    // console.log("inside checkcollision function")
    if(rod==rodTop){
        
        if(ballcenterX<paddlecenterX){
          angle=3*Math.PI/4;
        }
        else if(ballcenterX>paddlecenterX){
          angle=Math.PI/4;
        }
        else angle=0;
    }
    else if(rod==rodBottom){
      if(ballcenterX<paddlecenterX){
        angle=-3*Math.PI/4;
      }
      else if(ballcenterX>paddlecenterX){
        angle=-Math.PI/4;
      }
      else angle=Math.PI/2;
    }
    Vel=Vel+0.2;
    Vx=Vel * Math.cos(angle);
    Vy=Vel * Math.sin(angle);
  }

  ball.style.top=ball.offsetTop+Vy+"px";
  ball.style.left=ball.offsetLeft+Vx+"px";
  if(aPressed && rodTop.offsetLeft>1){
      rodTop.style.left=rodTop.offsetLeft-4+"px";
      rodBottom.style.left=rodBottom.offsetLeft-4+"px";
  }
  if(dPressed && rodTop.offsetLeft<gameContainer.offsetWidth-rodTop.offsetWidth){
    rodTop.style.left=rodTop.offsetLeft+4+"px";
    rodBottom.style.left=rodBottom.offsetLeft+4+"px";
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();
}
