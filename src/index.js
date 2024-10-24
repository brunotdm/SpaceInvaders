import Player from "./classes/Player.js";
import Projectile from "./classes/Projectile.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.imageSmoothingEnabled = false;
ctx.imageSmoothingQuality = "high";

const player = new Player(canvas.width, canvas.height);
//const p = new Projectile({x:600, y:689}, 5);
const playerProjectiles = [];

const keys = {
    left: false,
    right: false,
    shoot:{
        pressed: false,
        released: true
    }
};
const drawProjectiles = () => {
    playerProjectiles.forEach((projectile) => {
        projectile.draw(ctx);
        projectile.update();
    });
};

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //p.draw(ctx);
    //p.update();
    drawProjectiles();
    ctx.save();

    //Altera o eixo de rotação. Antes o eixo estava como 0,0 do Canva e depois passa a ser o centro do Player.
    ctx.translate(
        player.position.x + player.width / 2, 
        player.position.y + player.height / 2
    );

    if(keys.shoot.pressed && keys.shoot.released){
        //console.log("Shoot");
        player.shoot(playerProjectiles);
        keys.shoot.released = false;
        console.log(playerProjectiles);

    }
    
    if(keys.left && player.position.x >= 0){
        player.moveLeft();
        ctx.rotate(-0.35);

    }

    if(keys.right && player.position.x <= canvas.width - player.width ){
        player.moveRight();
        ctx.rotate(0.35);
    }
    ctx.translate(
        -player.position.x - player.width / 2, 
        -player.position.y - player.height / 2
    );
    
    player.draw(ctx);

    ctx.restore();

    //console.log("Teste");
    requestAnimationFrame(gameLoop);

};



addEventListener("keydown", (event) => {
    //console.log(event.key);
    const key = event.key.toLowerCase();

    if (key === "a"){
        keys.left = true;
    }

    if (key === "d"){
        keys.right = true;
    }

    if (key === "enter"){
        keys.shoot.pressed = true;
    }

});

addEventListener("keyup", (event) => {
    //console.log(event.key);
    const key = event.key.toLowerCase();

    if (key === "a"){
        keys.left = false;
    }

    if (key === "d"){
        keys.right = false;
    }

    if (key === "enter"){
        keys.shoot.pressed = false;
        keys.shoot.released = true;
    }

});

gameLoop();





