var mask = [];
var click = [];
var levelNumber = 1;
var statusGame = true;
var a = 0;
// This function will create sequence and stores them into mask !
function sequenceGenerator(a){
    document.getElementById('gameStatus').innerText = "This is the Simon Game !";
    document.getElementById('gameStatus2').innerText = "This is the Simon Game !";
    
    let x = 0;
    if(statusGame){
    var interval = setInterval(function(){
        x++;
        let random = Math.floor(Math.random()*4)+1;
        mask.push(random);
        document.getElementById(random).classList.add('duration-300','transition-colors','bg-slate-700');
        document.getElementById(random).addEventListener('transitionend',function(){
        document.getElementById(random).classList.remove('bg-slate-700');
        let audio = new Audio("sounds/" + random + ".mp3");
        audio.play();
        
        if(a==x){
            x=0;
            clearInterval(interval);
        }
    },{once:true})
    },700)
    clickInputs();
    }

    else{

    }
}


//will work only when game is over!
function gameOver(){
    let audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
    mask.splice(0,mask.length-1);
    click.splice(0,click.length-1);
    statusGame = false;
    document.getElementsByTagName('body')[0].style.backgroundColor = "red";
    document.getElementById('gameStatus').innerText = "Game over ! Reloading in 5 seconds !";
    document.getElementById('gameStatus2').innerText = "Game over ! Reloading in 5 seconds !";

    setTimeout(function(){
        location.reload();
    },5000)
}

// Takes inputs and validate by score !
function clickInputs(){
    mask.splice(0,mask.length);
    click.splice(0,click.length);
    var button = 0;
    if(statusGame){
       
        document.getElementById('1').addEventListener('click',function(event){
            click.push(1);
            
            if(click.length===levelNumber){
                checkClick();
            }
            event.stopImmediatePropagation();
        })
        
        document.getElementById('2').addEventListener('click',function(event){
            click.push(2);
            
            if(click.length===levelNumber){
                checkClick();
            }
            event.stopImmediatePropagation();
        })
        document.getElementById('3').addEventListener('click',function(event){
            click.push(3);
            
            if(click.length===levelNumber){
                checkClick();
            }
            event.stopImmediatePropagation();
        })
        document.getElementById('4').addEventListener('click',function(event){
            click.push(4);
            
            if(click.length===levelNumber){
                checkClick();
            }
            event.stopImmediatePropagation();
        })
    }
}

function gameStart(statusGame){
    
    if(statusGame==true){
        sequenceGenerator(levelNumber);
    }

    else{
        gameOver();
    }
}

function checkClick(){
    if(statusGame){
    for(let i = 0;i<mask.length;i++){
        if(parseInt(click[i])==mask[i]){
            a++;
        }

        else{
            a = 0;
            gameOver();
        }

        if(a===levelNumber){
            a = 0;
            document.getElementById('level').classList.add('transition-all','scale-120');
            document.getElementById('level').innerText = (++levelNumber);
            document.getElementsByTagName('body')[0].style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
            let audio3 = new Audio("sounds/level.mp3");
            audio3.play();
            audio3.addEventListener('ended',function(){
                sequenceGenerator(levelNumber);
            })
        }
    }
}
}

document.addEventListener('keypress',function(){
   statusGame = true;
   gameStart(statusGame);
},{once:true})


document.getElementById('btnn').addEventListener('click',function(){
    statusGame = true;
    gameStart(statusGame);
})