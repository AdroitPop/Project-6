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
                grid.addClass("unavailable weapons " + weapon.className);
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

    // initiating Game!!
    generateGrid();
    $('#start-game').click(function() {
        resetAll();
        deployPlayers(); 
        deployBlocks(); 
        // weapon1();
        deployWeapons();       
    })
})()