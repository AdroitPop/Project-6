"use strict";


(function(){
    const gridCount = 10;
    const blockCount = 12;

    const weapons = 
    [
      {
        name: "Gun",
        damage: 15,
        className: "weapon1",
        image: "images/gun.png"
      },
      {
        name: "Hammer",
        damage: 25,
        className: "weapon2",
        image: "images/hammer.png"
      },
      {
        name: "Sword",
        damage: 30,
        className: "weapon3",
        image: "images/sword.png"
      },
      {
        name: "Bomb",
        damage: 35,
        className: "weapon4",
        image: "images/bomb.png"
      },
      {
          name: "Shield",
          damage: 20,
          className: "shield",
          image: "images/shield"
      }

    ];

    // Adding the players id
    const Player = function(id){
        this.id=id;
        this.position={
        x:0,
        y:0
        };
        this.life= 100;
        }
    
    const player1 = new Player("player1");
    const player2 = new Player("player2");
    var activePlayer
    function generateRandomPosition() {
        return [Math.floor(Math.random() * gridCount), Math.floor(Math.random() * gridCount)];
    }
    
    // creating the all grid area
    function generateGrid(){
        console.log(gridCount)
        let html = "";
        for (let i = 0; i < gridCount; i++) {
            html += "<div class='row'>"
            for (let j = 0; j < gridCount; j++) {
                html += '<div class="grid-item" data-y='+i+' data-x='+j+'> </div>'
            }
            html += "</div>"
           }
           $('#battle-field').append(html);

    }
   // adding the blocks in the field ,the area is available random place.
    function deployBlocks(){
        let i = 0;
        while(i < blockCount) {
            let position =  generateRandomPosition(); 
            let grid = gridByPosition(position);
            if(!grid.hasClass("unavailable")){
                grid.addClass("unavailable block");
                i ++;  
            }
        }
    }

    function setUnavailable(position){
        gridByPosition(position).addClass("unavailable");
    }

    function gridByPosition(position) {
        return $("[data-x='"+ position[0] + "'][data-y='"+ position[1] + "']");
    }

    //Deploying the weapons in random positions

    function deployWeapons(){
        weapons.forEach(function (weapon) {
            let placed = false;

            while(!placed) {
            let position =  generateRandomPosition(); 
            let grid = gridByPosition(position);
            if(!grid.hasClass("unavailable")){
                grid.addClass("weapons " + weapon.className);
                placed = true
            }
        }
        });
        
    }

    // Deploying individual weapons
    //Weapon 1
    function weapon1(){
        deployWeapons();
        grid.addClass("unavailable weapon1");
    }
    //Weapon 2
    function weapon2(){
        deployWeapons();
        grid.addClass("unavailable weapon2");
    }
    //Weapon 3
    function weapon3(){
        deployWeapons();
        grid.addClass("unavailable weapon3");
    }
    //Weapon 4
    function weapon4(){
        deployWeapons();
        grid.addClass("unavailable weapon4");
    }

    // Sheild
    function shield(){
        deployWeapons();
        grid.addClass("unavailable shield");
    }

    // deploying the players in random positions
    function deployPlayers(){
      let position1 =  generateRandomPosition();
      let position2 =  generateRandomPosition();
      player1.position = {x: position1[0], y: position1[1]} ;
      player2.position = {x: position2[0], y: position2[1]} ;
    //   setUnavailable(position1)
      gridByPosition(position1).addClass("unavailable player1")
      gridByPosition(position2).addClass("unavailable player2")
    }

    // Reseting & re assigning everything as a new
    function resetAll() {
        $('.grid-item').each(function() {
            const element = $(this);
            console.log("Removing the blocks!!!!!")
            element.removeClass("block");
            element.removeClass("weapons");
            element.removeClass("weapon1");
            element.removeClass("weapon2");
            element.removeClass("weapon3");
            element.removeClass("weapon4");
            element.removeClass("shield");
            element.removeClass("player1");
            element.removeClass("player2");
            element.removeClass("unavailable");
        });
    }

    function setActivePlayer(player) {
        activePlayer = player;
        $("."+ activePlayer.id+"-content").addClass("active-player");
        highlightPath();
    }

    function highlightPath(){
      console.log(activePlayer.position.x);  
      console.log(activePlayer.position.y);
      let currentX = activePlayer.position.x;
      let currentY = activePlayer.position.y;
    //   check left side 
    let leftCount = 1;
    while( currentX - leftCount >= 0 ){
        let block = $('[data-x='+ (currentX - leftCount) +'][data-y='+ currentY +']') 
        if(block.hasClass('unavailable'))
            break; 
        else{
            block.addClass("highlight"); 
        }
        
        leftCount++;
        if(leftCount > 3){
            break;
        }
    }

    //   check top side
    let topCount = 1; 
    while( currentY -  topCount>= 0 ){
        let block = $('[data-x='+ (currentX) +'][data-y='+ (currentY - topCount) +']') 
        if(block.hasClass('unavailable'))
            break; 
        else{
            block.addClass("highlight") 
        }
        
        topCount++;
        if(topCount > 3){
            break;
        }
    }

    //   check right side 
    let rightCount = 1;
    while( currentX + rightCount < gridCount ){
        let block = $('[data-x='+ (currentX + rightCount) +'][data-y='+ currentY +']') 
        if(block.hasClass('unavailable'))
            break; 
        else{
            block.addClass("highlight") 
        }
        
        rightCount++;
        if(rightCount > 3){
            break;
        }
    }

    //   check bottom side 
    let bottomCount = 1; 
    while( currentY +  bottomCount>= 0 ){
        let block = $('[data-x='+ (currentX) +'][data-y='+ (currentY + bottomCount) +']') 
        if(block.hasClass('unavailable'))
            break; 
        else{
            block.addClass("highlight") 
        }
        
        bottomCount++;
        if(bottomCount > 3){
            break;
        }
        }

       $('.highlight').on("click", function(){
           if(!$(this).hasClass("highlight")){
               return;
           }
        resetPlayerOldPosition(activePlayer)  
        let clickedPosition = [$(this).data("x"), $(this).data("y")] 
        moveActivePlayerTo(clickedPosition);
        if(adjacentPlayers()){

        }else if(hasWeapon(clickedPosition)){ 

        }
        else{
            // set other player as active and highlight
            setActivePlayer(nextPlayer())
        }
        
       }) 
    }

    function hasWeapon(clickedPosition){

    }

    function adjacentPlayers(){
      p1X = player1.position.x;
      p1Y = player1.position.y;
      p2X = player2.position.x;
      p1Y = player2.position.y;
      
    }

    function moveActivePlayerTo(position){
        activePlayer.position.x = position[0];
        activePlayer.position.y = position[1];
        
        gridByPosition(position).addClass("unavailable " + activePlayer.id); 
    }

    function resetPlayerOldPosition(player){
        gridByPosition([activePlayer.position.x,activePlayer.position.y]).removeClass("unavailable")
        $('.highlight').removeClass("highlight") 
        $('.grid-item').removeClass(activePlayer.id) 
    }

    function nextPlayer(){
        return (activePlayer.id == player1.id ? player2 : player1);
    }

    // initiating Game!!
    generateGrid();
    $('#start-game').click(function() {
        resetAll();
        deployPlayers(); 
        deployBlocks(); 
        // weapon1();
        deployWeapons(); 
        setActivePlayer(player1); 

    })
})()
