import { INITIAL_FRAMES, PATH_ENGINE_IMAGE, PATH_ENGINE_SPRITES, PATH_SPACESHIP_IMAGE } from "../utils/constants.js";
import Projectile from "./Projectile.js";
class Player {
    width;
    height;
    position;
    velocity;

    constructor(canvasWidth, canvasHeight){
        //this.width = 100;
        //this.height = 100;
        this.width = 48 * 2;
        this.height = 48 * 2;
        this.velocity = 10;
        this.position = {
            x: canvasWidth / 2 - this.width / 2,
            y: canvasHeight - this.height - 30,
        };
        //this.image = this.getImage("src/assets/images/invader.png");
        this.image = this.getImage(PATH_SPACESHIP_IMAGE);
        this.engineImage = this.getImage(PATH_ENGINE_IMAGE);
        this.engineSprites = this.getImage(PATH_ENGINE_SPRITES);

        this.sx = 0; //Variável para criar a animação de fogo das turbinas
        this.framesCounter = INITIAL_FRAMES; //Variável para ajustar a velocidade da animação do fogo das turbinas
    }

    getImage(path){
        const image = new Image();
        image.src = path;
        return image;
    }


    draw(ctx){
        //ctx.fillStyle = "red";
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
 
           
       
        ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        );

        ctx.drawImage(
            this.engineSprites,
            //48 * 0,
            this.sx, 
            0,          
            48, 
            48,
            this.position.x, //posição x do Player
            this.position.y + 5, //posição y do Player
            this.width, //largura do Player
            this.height //altura do Player   
        ); 

        ctx.drawImage(
            this.engineImage, 
            this.position.x, 
            this.position.y + 4, 
            this.width, 
            this.height
        ); 
        this.update(); 
    }

    update(){

        if(this.framesCounter === 0){
            if(this.sx === 96){
                this.sx = 0;
            } else {
                this.sx += 48
            }
            this.framesCounter = INITIAL_FRAMES;
        }
        this.framesCounter--;
    }

    moveLeft(){
        this.position.x -= this.velocity;
    }

    moveRight(){
        this.position.x += this.velocity;
    }

    shoot(projectiles){
        const p = new Projectile({
                x: this.position.x + this.width / 2,
                y: this.position.y,
            }, 
            -5
        );
        projectiles.push(p); 
    }
}
export default Player;