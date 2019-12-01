
window.onload = function() {
   var canvas = document.getElementById("canvas");
   if (canvas == null || canvas.getContext == null) return;
   canvas.width = $(window).innerWidth();
   canvas.height = $(window).innerHeight();

   ctx = canvas.getContext("2d");
   canvasWidth = canvas.width;
   canvasHeight = canvas.height;

   player.push({
     x : canvasWidth / 2,
     y : canvasHeight / 2,
     speed : 3,
     hp : hero[heroNum].hp,
     prints : [],
     angle : 0,
     power : hero[heroNum].power,
     damages : hero[heroNum].bulletDamages,
   });
   hp = hero[heroNum].hp;
   bulletCount = hero[heroNum].bulletCount_full;
   gameloop = setInterval(gameLoop, 20);
   zombieSpon = setTimeout(spon, 5000);
}
function spon(){
  var zombieHP = 100;
  var rndSpeed;
  var rndZombie = Math.floor(Math.random()*3)+0;
  var rndX = Math.floor(Math.random()*canvasWidth *2)
  var rndY = Math.floor(Math.random()*canvasHeight *2);
  if(rndZombie == 0)
  {
    rndSpeed = (Math.random()*1)+0.3;
  }
  else if(rndZombie ==1){
    rndSpeed = (Math.random()*4.8)+3;
  }
  else{
    rndSpeed = (Math.random()*2)+1;
  }
  zombie.push({
    x : rndX,
    y : rndY,
    spped : rndSpeed,
    hp : zombieHP,
    angle : 0,
    foot : true,
    live : true,
    num : rndZombie,
  })
  if(zombieSpon_fps > 1000)
  {
    console.log(zombieSpon_fps);
    zombieSpon_fps -= 100;
  }
  else{
    console.log(clearCount);
    clearCount++;
    if(clearCount > 50 && killZombie > 30)
    {
      GAME = 3;
      clearTimeout(zombieSpon);
      clearInterval(gameloop);
      draw();
    }
  }
  if(GAME == 1)
  {
    zombieSpon = setTimeout(spon, zombieSpon_fps)
  }
}
function draw(){
if(GAME == 1)
{
  ctx.drawImage(background,offsetX, offsetY, canvasWidth, canvasHeight)
  ctx.drawImage(background,canvasWidth + offsetX, offsetY, canvasWidth , canvasHeight)
  ctx.drawImage(background,offsetX, canvasHeight + offsetY, canvasWidth , canvasHeight)
  ctx.drawImage(background,canvasWidth + offsetX, canvasHeight + offsetY, canvasWidth , canvasHeight)
  ctx.drawImage(blood,offsetX, offsetY, canvasWidth*2, canvasHeight*2)
  ctx.save();
  ctx.translate(offsetX, offsetY)
  ctx.fillStyle = "black"
  for(var i=0; i<player.length; i++)
  {
    ctx.save();
    ctx.translate(player[i].x - offsetX + rediusY, player[i].y - offsetY + rediusY);
    ctx.rotate(player[i].angle);
    ctx.translate(-(player[i].x - offsetX + rediusY), -(player[i].y - offsetY + rediusY));
    ctx.drawImage(Img, player[i].x - offsetX, player[i].y - offsetY, 85 , 60);
    ctx.restore();        //컨텍스트 반환
    ctx.font="bold 20px 돋움";
  }
  for(var i=0; i<zombie.length; i++)
  {
    if(zombie[i].live)
    {
      ctx.save();
      ctx.translate(zombie[i].x + zombieRediusX, zombie[i].y + zombieRediusX);
      ctx.rotate(zombie[i].angle);
      ctx.translate(-(zombie[i].x + zombieRediusY), -(zombie[i].y + zombieRediusY));
      if(zombie[i].num == 0)
      {
        ctx.drawImage(zombieImg1_L, zombie[i].x, zombie[i].y, 100 , 80);
      }
      else if(zombie[i].num == 1)
      {
        ctx.drawImage(zombieImg2_R, zombie[i].x, zombie[i].y, 100 , 80);
      }
      else if(zombie[i].num == 2)
      {
        ctx.drawImage(zombieImg3_L, zombie[i].x, zombie[i].y, 100 , 80);
      }
      else if(zombie[i].num == 3)
      {
        ctx.drawImage(zombieImg, zombie[i].x, zombie[i].y, 150 , 150);
      }
      ctx.restore();
      ctx.fillStyle = "red";
      ctx.fillRect(zombie[i].x, zombie[i].y-25, zombie[i].hp, 7.5);
    }
  }

  for(var i=0 ; i<bullet.length; i++)
  {
    ctx.save();
    ctx.fillStyle = bullet[i].color
    ctx.fillRect(bullet[i].x - offsetX, bullet[i].y - offsetY, 3, 3);
    ctx.restore();
  }
  if(porwerBullet.length > 0)
  {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(porwerBullet[0].x - offsetX, porwerBullet[0].y - offsetY, 6, 6);
    ctx.restore();
  }
  if(explode)
  {
    for(var j = 0; j < circles.length; j++){
      var c = circles[j]
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, Math.PI*2, false);
      ctx.fillStyle = "rgba("+c.r+", "+c.g+", "+c.b+", 0.9)";
      ctx.fill();
      c.x += c.vx * 2;
      c.y += c.vy * 2;
      c.radius -= .09;
      if(c.radius < 0 )
      {
        circles.splice(j, 1);
      }
      if(circles.legnth < 0){
        explode = false;
      }
    }
  }
  ctx.restore();

  ctx.save();
  //UI DRAW
  ctx.fillStyle = "white";
  ctx.font="bold 30px 맑은고딕";
  ctx.fillText(bulletCount+ '/' + hero[heroNum].bulletCount_full, 400,60);
  ctx.fillText(score, 550,60);
  ctx.fillText(killZombie + '/ 50', 700,60);
  ctx.fillText(50 - Math.floor(porwerBullet_colDown / 10), 1000, 60)
  var size = 90;
  ctx.save();
  ctx.fillStyle = "red"
  ctx.beginPath();
  ctx.scale(0.4, 0.4);
  ctx.bezierCurveTo(75+size,37+size,70+size,25+size,50+size,25+size);
  ctx.bezierCurveTo(20+size,25+size,20+size,62.5+size,20+size,62.5+size);
  ctx.bezierCurveTo(20+size,80+size,40+size,102+size,75+size,120+size);
  ctx.bezierCurveTo(110+size,102+size,130+size,80+size,130+size,62.5+size);
  ctx.bezierCurveTo(130+size,62.5+size,130+size,25+size,100+size,25+size);
  ctx.bezierCurveTo(85+size,25+size,75+size,37+size,75+size,40+size);
  ctx.fill();
  ctx.restore()
  ctx.scale(1, 1);
  ctx.fillStyle = "white";
  ctx.transform(1, 0, -0.75, 1, 0, 0);
  for(var i=0; i<hero[heroNum].hp / 5; i++)
  {
    ctx.fillRect(125 + i*12, 60, 10, 10);
  }
  ctx.fillStyle = "red";
  for(var i=0; i<player[myPlayer].hp / 5; i++)
  {
    ctx.fillRect(125 + i*12, 60, 10, 10);
  }
  ctx.restore();
  ctx.save();
  ctx.globalAlpha=0.1;
  ctx.drawImage(background1234,offsetX, offsetY, canvasWidth*2, canvasHeight*2)
  ctx.restore();
}
else if(GAME == 2)
{
  ctx.drawImage(background,offsetX, offsetY, canvasWidth*2, canvasHeight*2)
  ctx.drawImage(blood,offsetX, offsetY, canvasWidth*2, canvasHeight*2)
  ctx.save();
  ctx.fillStyle = "red"
  ctx.font="bold 150px 양재샤넬체M";
  ctx.fillText('GAME OVER', canvasWidth / 2 - 500, canvasHeight/2 - 25);
  ctx.restore();
}
else if(GAME == 3)
{
  ctx.drawImage(background,offsetX, offsetY, canvasWidth*2, canvasHeight*2)
  ctx.drawImage(blood,offsetX, offsetY, canvasWidth*2, canvasHeight*2)
  ctx.save();
  ctx.font="bold 150px 양재샤넬체M";
  ctx.fillStyle = "skyblue"
  ctx.fillText('GAME CLEAR', canvasWidth / 2 - 550, canvasHeight/2 - 50);
  ctx.restore();
}
}
function create() {

//Place the circles at the center

this.x = player[myPlayer].x + rediusX - offsetX/2;
this.y = player[myPlayer].y + rediusY - offsetY/2;


//Random radius between 2 and 6
this.radius = 5 + Math.random()*3;

//Random velocities
this.vx = -5 + Math.random()*10;
this.vy = -5 + Math.random()*10;

//Random colors
// this.r = Math.round(Math.random())*255
// this.g = 0;
// this.b = 0;
var tmp = Math.floor(Math.random()*3)+1
if(tmp == 1)
{
  this.r = 105;
  this.g = 99;
  this.b = 89;
}
else if(tmp ==2)
{
  this.r = 240;
  this.g = 46;
  this.b = 46;
}
else{
  this.r = 255;
  this.g = 175;
  this.b = 46;
}

}
function gameLoop(){

if(isKeyDown[65]) //왼쪽 감
{
  if(player[myPlayer].x - offsetX > canvasWidth / 2 && player[myPlayer].x - offsetX < canvasWidth )
  {
    offsetX += player[myPlayer].speed;
  }
  else if(player[myPlayer].x < canvasWidth && player[myPlayer].x > 0 + rediusX * 2)
  {
    player[myPlayer].x -= player[myPlayer].speed;
  }
}
if(isKeyDown[68]) //오른쪽
{
  if(player[myPlayer].x - offsetX< canvasWidth && player[myPlayer].x - offsetX >= canvasWidth / 2)
  {
    offsetX -= player[myPlayer].speed
  }
  else if(player[myPlayer].x < canvasWidth - rediusY * 2){
    player[myPlayer].x += player[myPlayer].speed;
  }
}
if(isKeyDown[83]) //아래로
{
  if(player[myPlayer].y - offsetY< canvasHeight && player[myPlayer].y - offsetY >= canvasHeight / 2)
  {
    offsetY -= player[myPlayer].speed
  }
  else if(player[myPlayer].y < canvasHeight - rediusY * 2)
  {
    player[myPlayer].y += player[myPlayer].speed;
  }
}
if(isKeyDown[87]) //위로
{
  if(player[myPlayer].y - offsetY > canvasHeight / 2 && player[myPlayer].y - offsetY < canvasHeight)
  {
    offsetY += player[myPlayer].speed
  }
  else if (player[myPlayer].y < canvasHeight && player[myPlayer].y > 0 + redius / 2){
    player[myPlayer].y -= player[myPlayer].speed;
  }
}
if(isKeyDown[16])
{
  if(checked)
  {
    player[myPlayer].speed = 5;
    checked = false;
  }
}
if(!isKeyDown[16])
{
  player[myPlayer].speed = 3;
  checked = true;
}
if(porwerBullet_colDown < 500)
{
  porwerBullet_colDown += 1;
}
if(porwerBullet_colDown > 500)
{
  porwerBullet_ready = true;
}
if(porwerBullet.length > 0)
{
  if(porwerBullet[0].y < 0  || porwerBullet[0].y > canvasHeight ||
      porwerBullet[0].y > canvasHeight  || porwerBullet[0].x < 0
      || porwerBullet[0].distance > hero[heroNum].bulletDistance_full)
  {
    porwerBullet.splice(0, 1)
  }
  else{
    porwerBullet[0].x += porwerBullet[0].dx * 5;
    porwerBullet[0].y += porwerBullet[0].dy * 5;
  }
}
if(isKeyDown[81])
{
  if(porwerBullet_ready && porwerBullet_colDown == 500)
  {
      console.log("히오스!");
      porwerBullet.push({
        x : player[myPlayer].x - offsetX,
        y : player[myPlayer].y - offsetY,
        dx : dirx_f,
        dy : diry_f,
      });
      porwerBullet_colDown = 0;
      isKeyDown[81] = false;
      porwerBullet_ready = false;
  }
}
if(isKeyDown[82])
{
  var tmpNum = 0;
  clearTimeout(timeoutId);
  var reload = setInterval(function(){
    Img.src = "file/img/reload/survivor-reload_shotgun_"+tmpNum+".png"
    tmpNum++;
    if(tmpNum == 19)
    {
      clearInterval(reload);
    }
  }, 50)
  setTimeout(function(){
    console.log('재장전!')
    bulletCount = hero[heroNum].bulletCount_full;
  }, 1000)
  isKeyDown[82] = false;
}
for(var i=0; i<bullet.length; i++)
{
  bullet[i].x += (bullet[i].dx * hero[heroNum].bulletSpeed);
  bullet[i].y += (bullet[i].dy * hero[heroNum].bulletSpeed);
  bullet[i].distance += 0.05;
  for (var j=0; j<zombie.length; j++)
  {
    var redBullet = 1;
    var deltaX = (zombie[j].x + zombieRediusX) - (bullet[i].x - offsetX);
    var deltaY = (zombie[j].y + zombieRediusY) - (bullet[i].y - offsetY);
    var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if(length <= 55)
    {
      if(bullet[i].color == "red")
      {
        redBullet = 0.5;
      }
      else{
        redBullet = 2;
      }
      if(zombie[j].num == 0){
        zombie[j].hp -= player[myPlayer].damages * 0.3 * redBullet;
        zombie[j].x += (bullet[i].dx) * zombie[j].spped * player[myPlayer].power;
        zombie[j].y += (bullet[i].dy) * zombie[j].spped * player[myPlayer].power;
        score += 20;
      }
      else if(zombie[j].num == 1){
        zombie[j].hp -= player[myPlayer].damages *1.3 * redBullet;
        zombie[j].x += (bullet[i].dx) * zombie[j].spped * player[myPlayer].power;
        zombie[j].y += (bullet[i].dy) * zombie[j].spped * player[myPlayer].power;
        score += 10;
      }
      else if(zombie[j].num == 2){
        zombie[j].hp -= player[myPlayer].damages  * redBullet;
        zombie[j].x += (bullet[i].dx) * zombie[j].spped * player[myPlayer].power;
        zombie[j].y += (bullet[i].dy) * zombie[j].spped * player[myPlayer].power;
        score += 15;
      }
      bullet[i].color = "red"


      if(zombie[j].hp <= 0)
      {
        score += 300;
        killZombie ++;
        zombie[j].live = false;
        for (var k = 0; k < 100; k++) {
          circles.push({
            x : zombie[j].x + zombieRediusX,
            y : zombie[j].y + zombieRediusY,
            radius : 3 +Math.random()*3,
            vx : -5 + Math.random()*10,
            vy : -5 + Math.random()*10,
            r : Math.round(Math.random())*255,
            g : 0,
            b : 0,
          })
        }
        explode = true;
        zombie.splice(j, 1)
        // player.splice(myPlayer, 1);
      }
  }
  }
  if(bullet[i].y < 0  || bullet[i].y > canvasHeight ||
      bullet[i].y > canvasHeight  || bullet[i].x < 0
      || bullet[i].distance > hero[heroNum].bulletDistance_full)
  {
    bullet.splice(i, 1);
  }

}
if(player[myPlayer].hp <= 0)
{
  GAME = 2;
  clearInterval(gameloop);
  clearInterval(zombieSpon);
}
fnZombie();
draw();
}
function fnZombie()
{
for(var i=0; i<zombie.length; i++)
{
  var xpos = player[myPlayer].x - offsetX - zombie[i].x;
  var ypos = player[myPlayer].y  - offsetY- zombie[i].y;

  var len = Math.sqrt(xpos*xpos + ypos*ypos);
  if(len < 800)
  {
    var dx = (player[myPlayer].x - offsetX + rediusX) - (zombie[i].x + zombieRediusX),
          dy = (player[myPlayer].y - offsetY + rediusY) - (zombie[i].y + zombieRediusY),
          len = Math.sqrt(dx * dx + dy * dy);
      dx /= len ? len : 1.0; dy /= len ? len : 1.0;
      var dirx = Math.cos(zombie[i].angle);
      var diry = Math.sin(zombie[i].angle);
      dirx += (dx - dirx) * 0.05;
      diry += (dy - diry) * 0.05;
      zombie[i].angle = Math.atan2(diry, dirx);
      zombie[i].x += dirx * zombie[i].spped;
      zombie[i].y += diry * zombie[i].spped;
      var deltaX = (player[myPlayer].x - offsetX + rediusX) - (zombie[i].x + zombieRediusX);
      var deltaY = (player[myPlayer].y - offsetY +rediusY) - (zombie[i].y +  zombieRediusY);
      var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if(50 > length)
      {
          player[myPlayer].hp -= 1;
        if((player[myPlayer].x - offsetX > canvasWidth / 2 && player[myPlayer].x - offsetX < canvasWidth)&&
            (player[myPlayer].x - offsetX< canvasWidth && player[myPlayer].x - offsetX >= canvasWidth / 2)&&
            (player[myPlayer].y - offsetY< canvasHeight -rediusY *2 && player[myPlayer].y - offsetY >= canvasHeight / 2)&&
            (player[myPlayer].y - offsetY > canvasHeight / 2 && player[myPlayer].y - offsetY < canvasHeight - rediusY *2))
            {
              offsetX -= (dirx * 10);
              offsetY -= (diry * 10);
            }
            else{
              player[myPlayer].x -= -(dirx * 10);
              player[myPlayer].y -= -(diry * 10);
            }

      }
  }
  else{
    if(zombie[i].hp < 100)
    {
      zombie[i].hp += 0.25
    }
  }
}
}

$(window).mousemove(function(e){
mouseX = e.pageX;
mouseY = e.pageY;
var dx = mouseX - player[myPlayer].x,
      dy = mouseY - player[myPlayer].y,
      len = Math.sqrt(dx * dx + dy * dy);
  dx /= len ? len : 1.0; dy /= len ? len : 1.0;
  var dirx = Math.cos(player[myPlayer].angle);
  var diry = Math.sin(player[myPlayer].angle);
  dirx += (dx - dirx) * 0.9;
  diry += (dy - diry) * 0.9;
  dirx_f = dirx;
  diry_f = diry;
  player[myPlayer].angle = Math.atan2(diry_f, dirx_f);
});

$(window).mousedown(function() {
if(checked)
{
  if(bulletCount >= 1)
  {
    var xpos = (42.5) * Math.cos(player[myPlayer].angle + hero[heroNum].bulletPos) + (player[myPlayer].x + rediusY);
    var ypos = (42.5) * Math.sin(player[myPlayer].angle + hero[heroNum].bulletPos) + (player[myPlayer].y + rediusY);
    bullet.push({
      x : xpos,
      y : ypos,
      dx : dirx_f,
      dy : diry_f,
      distance : 0,
      color : "white"
    });
    bulletCount--;
    var tmpNum = 0;
    var shot = setInterval(function(){
      Img.src = "file/img/shoot/survivor-shoot_shotgun_"+tmpNum+".png"
      tmpNum++;
      if(tmpNum == 3)
      {
        clearInterval(shot)
      }
    }, 100)
    timeoutId = setInterval(function(){
      var xpos = (42.5) * Math.cos(player[myPlayer].angle + hero[heroNum].bulletPos) + (player[myPlayer].x + rediusY);
      var ypos = (42.5) * Math.sin(player[myPlayer].angle + hero[heroNum].bulletPos) + (player[myPlayer].y + rediusY);
      bullet.push({
        x : xpos,
        y : ypos,
        dx : dirx_f,
        dy : diry_f,
        distance : 0,
        color : "white"
      });
      bulletCount--;
      var tmpNum = 0;
      var shot = setInterval(function(){
        Img.src = "file/img/shoot/survivor-shoot_shotgun_"+tmpNum+".png"
        tmpNum++;
        if(tmpNum == 3)
        {
          clearInterval(shot)
        }
      }, 100)
      if (bulletCount <= 0)
      {
        regun = true;
        var tmpNum = 0;
        console.log('총알 소진!')
        var reload = setInterval(function(){
          Img.src = "file/img/reload/survivor-reload_shotgun_"+tmpNum+".png"
          tmpNum++;
          if(tmpNum == 19)
          {
            clearInterval(reload);
          }
        }, 100)
        clearTimeout(timeoutId);

        setTimeout(function(){
          console.log('재장전!')
          bulletCount = hero[heroNum].bulletCount_full;
        }, 1000)
      }
      if(heroNum == 0)
      {
        hero[heroNum].bulletPos = hero[heroNum].bulletPos * -1;
      }
    }, hero[heroNum].bulletFps);
  }
}

}).bind('mouseup mouseleave', function() {
  clearTimeout(timeoutId);
  clearTimeout(timeoutId2);
});

$(window).keydown(function(e){
isKeyDown[e.keyCode] = true;
});
$(window).keyup(function(e){
isKeyDown[e.keyCode] = false;
});
