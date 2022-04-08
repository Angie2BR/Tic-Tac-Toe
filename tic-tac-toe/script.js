function initializeGame(){
 const title = document.querySelector('.title');
 const button = document.querySelector('.button');
 const boxes = document.querySelectorAll('.box');
 const gridArray = Array.from(boxes);
 let tracking = [1,2,3,4,5,6,7,8,9];
let currentPlayer = 'playerX';

//loop through all of the boxes:

boxes.forEach(box =>{
    box.addEventListener('click',(e)=>{

        const index = gridArray.indexOf(e.target);

        //this does not allow the same box to be clicked again:
        if(
            boxes[index].classList.contains("playerX") ||
            boxes[index].classList.contains("computer")){
                return;
        }


        boxes[index].classList.add('playerX');

        //splice Player X's move number from the tracking array:

        const spliceNum = tracking.indexOf(index + 1);
        tracking.splice(spliceNum, 1);

        //check to see if player won:

        if(playerWon('playerX', boxes)){
            title.innerHTML='Player X won!'
            document.body.classList.add('over');
            return;
        }

        //check for a draw:

        if(tracking.length === 0){
            title.innerHTML = "It's a Draw!"
            document.body.classList.add('over');
            return;
        }

        //Now for the computers turn:

        const randomNum = Math.floor(Math.random()*tracking.length);
        const computerIndex = tracking[randomNum];
        boxes[computerIndex -1].classList.add('computer');

        //splice the computer move number from the tracking array:

        tracking.splice(randomNum,1);

        //then check to see if the computer won:
        if(playerWon('computer', boxes)){
            title.innerHTML='Computer won!'
            document.body.classList.add('over');
            return;
        }

    })
})
    //relaod the game:
    button.addEventListener('click', ()=>{
    location.reload();
})
}


function playerWon(playerName,boxes){
    function check(pos1,pos2,pos3){
        if(
        boxes[pos1].classList.contains(playerName) && 
        boxes[pos2].classList.contains(playerName) &&
        boxes[pos3].classList.contains(playerName))
        {
            return true;
        }else{
            return false;
        }
    }
    if( check(0,3,6) ) return true;
    else if ( check(1,4,7) ) return true;
    else if ( check(2,5,8) ) return true;
    else if ( check(0,1,2) ) return true;
    else if ( check(3,4,5) ) return true;
    else if ( check(6,7,8) ) return true;
    else if ( check(0,4,8) ) return true;
    else if ( check(2,4,6) ) return true;

}

initializeGame();

