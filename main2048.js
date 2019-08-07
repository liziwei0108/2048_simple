var board=new Array();
var score=0;

$(document).ready(function(){
    newgame();

});

function newgame(){
    //初始化棋盘格
    init();

    //在随机两个格子生成数字
    createNewNumber();
    createNewNumber();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var girdCell=document.getElementById("grid_cell_"+i+"_"+j);
            girdCell.style.top=getPosTop(i,j)+"px";
            girdCell.style.left=getPosLeft(i,j)+"px";

        }
    }

    for(var i=0;i<4;i++){
        board[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
        }
    }

    updateBoardView();
    score=0;


}

function updateBoardView(){
    $(".number_cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var newDiv=document.createElement("div");
            newDiv.className="number_cell";
            newDiv.id="number_cell_"+i+"_"+j;
            document.getElementById("grid_container").appendChild(newDiv);

            var theNumberCell=document.getElementById("number_cell_"+i+"_"+j);

            if(board[i][j]==0){
                theNumberCell.style.height="0px";
                theNumberCell.style.width="0px";
                theNumberCell.style.top=getPosTop(i,j)+50+"px";
                theNumberCell.style.left=getPosLeft(i,j)+50+"px";

            }else{
                theNumberCell.style.height="100px";
                theNumberCell.style.width="100px";
                theNumberCell.style.top=getPosTop(i,j)+"px";
                theNumberCell.style.left=getPosLeft(i,j)+"px";
                theNumberCell.style.backgroundColor=getNumberBackgroundColor(board[i][j]);    
                theNumberCell.style.color=getNumberColor(board[i][j]);  
                theNumberCell.innerText=board[i][j];               
            }
        }
    }
}

function createNewNumber(){
    if(nospace(board)){
        return false;
    }else{
        //随机一个位置
        var randomx=parseInt(Math.floor(Math.random()*4));
        var randomy=parseInt(Math.floor(Math.random()*4));

        while(true){
            if(board[randomx][randomy]==0)
            break;
            else{
                randomx=parseInt(Math.floor(Math.random()*4));
                randomy=parseInt(Math.floor(Math.random()*4));
            }
        }

        //随机一个数字
        var randomNumber=Math.random()<0.5?2:4;

        //在该随机位置显示该随机数字
        board[randomx][randomy]=randomNumber;
        showNumberAnimation(randomNumber,randomx,randomy);

        return true;
    }

}

$(document).keydown(function(event){
    switch(event.keyCode){
        //left
        case 37:
            if(moveLeft()){
                setTimeout("createNewNumber()",210) ;
                setTimeout("isGameOver()",300);
            };
            break;
        //up
        case 38:
            if(moveUp()){
                setTimeout("createNewNumber()",210);
                setTimeout("isGameOver()",300);
            };
            break;
        //right
        case 39:
            if(moveRight()){
                setTimeout("createNewNumber()",210);
                setTimeout("isGameOver()",300);
            };
            break;
        //down
        case 40:
            if(moveDown()){
                setTimeout("createNewNumber()",210);
                setTimeout("isGameOver()",300);
            };
            break;
        default:
            break;
    }
});

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }else{
        for(var i=0;i<4;i++){
            for(var j=1;j<4;j++){
                if(board[i][j]!=0){
                    for(var k=0;k<j;k++){
                        if(board[i][k]==0 && noBlockLeft(i,k,j,board)){
                            //move
                            showMoveAnimation(i,j,i,k);
                            board[i][k]=board[i][j];
                            board[i][j]=0;
                            continue;
                        }else if(board[i][k]==board[i][j] && noBlockLeft(i,k,j,board)){
                            //move
                            showMoveAnimation(i,j,i,k);
                            //add
                            board[i][k]+=board[i][j];
                            board[i][j]=0;

                            //add score
                            score+=board[i][k];
                            updateScore(score);
                    
                            continue;
                        }
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()",200);
    
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }else{
        for(var i=0;i<4;i++){
            for(var j=3;j>=0;j--){
                if(board[i][j]!=0){
                    for(var k=3;k>j;k--){
                        if(board[i][k]==0 && noBlockRight(i,j,k,board)){
                            //move
                            showMoveAnimation(i,j,i,k);
                            board[i][k]=board[i][j];
                            board[i][j]=0;
                            continue;
                        }else if(board[i][k]==board[i][j] && noBlockRight(i,j,k,board)){
                            //move
                            showMoveAnimation(i,j,i,k);
                            //add
                            board[i][k]+=board[i][j];
                            board[i][j]=0;

                            //add score
                            score+=board[i][k];
                            updateScore(score);
                    
                            continue;
                        }
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }else{
        for(var i=1;i<4;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]!=0){
                    for(var k=0;k<i;k++){
                        if(board[k][j]==0 && noBlockUp(k,i,j,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            board[k][j]=board[i][j];
                            board[i][j]=0;
                            continue;
                        }else if(board[k][j]==board[i][j] && noBlockUp(k,i,j,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            //add
                            board[k][j]+=board[i][j];
                            board[i][j]=0;

                            //add score
                            score+=board[i][k];
                            updateScore(score);
                    
                            continue;
                        }
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }else{
        for(var i=0;i<3;i++){
            for(var j=0;j<4;j++){
                if(board[i][j]!=0){
                    for(var k=3;k>i;k--){
                        if(board[k][j]==0 && noBlockUp(i,k,j,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            board[k][j]=board[i][j];
                            board[i][j]=0;
                            continue;
                        }else if(board[k][j]==board[i][j] && noBlockUp(i,k,j,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            //add
                            board[k][j]+=board[i][j];
                            board[i][j]=0;

                            //add score
                            score+=board[i][k];
                            updateScore(score);
                    
                            continue;
                        }
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()",200);
    return true;
}


function isGameOver(){
    if(nospace(board)&&noMove(board)){
        alert("Game Over!");
    }
}