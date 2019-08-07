function showNumberAnimation(number,x,y){
    //var numberCell=document.getElementById("number_cell_"+x+"_"+y);
    var numberCell=$("#number_cell_"+x+"_"+y);

    //numberCell.style.backgroundColor=getNumberBackgroundColor(number);
    //numberCell.style.color=getNumberColor(number);
    //numberCell.innerText=number;

    numberCell.css("background-color",getNumberBackgroundColor(number));
    numberCell.css("color",getNumberColor(number));
    numberCell.text(number);

    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(x,y),
        left:getPosLeft(x,y),

    },50);


}

function showMoveAnimation(fromx,fromy,tox,toy){
    var cell=$("#number_cell_"+fromx+"_"+fromy);

    cell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function updateScore(score){
    document.getElementById("score").innerText=score;
}