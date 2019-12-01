var ctx;

var Img = new Image();
Img.src = "file/img/aa.png"
var zombieImg = new Image();
zombieImg.src = "file/img/zombie/skeleton-move_0.png"
var zombieImg1_L = new Image();
zombieImg1_L.src = "file/img/Zombie1_L.png"
var zombieImg1_R = new Image();
zombieImg1_R.src = "file/img/Zombie1_R.png"
var zombieImg2_L = new Image();
zombieImg2_L.src = "file/img/Zombie2_L.png"
var zombieImg2_R = new Image();
zombieImg2_R.src = "file/img/Zombie2_R.png"
var zombieImg3_L = new Image();
zombieImg3_L.src = "file/img/Zombie3_L.png"
var zombieImg3_R = new Image();
zombieImg3_R.src = "file/img/Zombie3_R.png"
var background = new Image();
background.src = "file/img/background123.png"
var background1234 = new Image();
background1234.src = "file/img/background1234.jpg"
var blood = new Image();
blood.src = "file/img/blood.png"

var isKeyDown = [];
var canvasWidth;
var canvasHeight;
var timeoutId;
var timeoutId2;
var zombieRediusX = 50;
var zombieRediusY = 40;
var bossZombieRedius = 75;
var zombie1RediusX = 60

/* POSION */
var posX;
var posY;
var angle = 90;
var redius = 30;
var rediusX = 42.5;
var rediusY = 30;
var dirx_f,
  diry_f;
var mouseX;
var mouseY;// 각도, 거리 계산
var checked = true;
var circles = [];
var explode = false;

var score = 0;
var killZombie = 0;


/* SKILL */
/* GAME PLAY */
var player = new Array();
var myPlayer = 0;
var GAME = 1;
var gameloop;

/* BULLET */
var bullet = new Array();
var bullets = new Array();

var zombieSpon;
var hero = [{
  hp : 150,
  bulletPos : 0.4,
  bulletCount_full : 30,
  bulletDistance_full : 0.4,
  bulletSpeed : 20,
  bulletFps : 35,
  power : 0.5,
  bulletDamages : 0.9,
},
{
  hp : 20,
  bulletPos : 0.35,
  bulletCount_full : 25,
  bulletDistance_full : 3,
  bulletSpeed : 20,
  bulletFps : 110,
  power : 1.01,
  bulletDamages : 3,
},
{
  hp : 50,
  bulletPos : 0.0,
  bulletCount_full : 3,
  bulletDistance_full : 5,
  bulletSpeed : 30,
  bulletFps : 110,
  power : 0.8,
  bulletDamages : 20,
}];

var zombie = new Array();
var zombieSpon_fps = 5000;

var heroNum = 1;
var clearCount = 0;
var offsetX = 0,
    offsetY = 0;

var porwerBullet = []

var porwerBullet_ready = true;
var porwerBullet_colDown = 0;
