

$(document).ready(function () {
    //create a list of characters
    

    var player;
    var enemy;
    var characters;

    function Message(){
        var message = "";
        if(player === ""){
            message = "Choose your Character";
        }
        else if (characters.length === 0 && enemy.health <= 0){
            message = "You WIN!";
        }
        else if(enemy === "" || enemy.health === 0){
            message = "Choose your Enemy";
        }
        else if(player.health === 0){
            message = "You Lose";
        }
        else{
            message = "Lets Play";
        }
        $("#message").text(message);
    }

    function CopyCol(col){
        var items = [];
        col.forEach(item => {
            items.push(item);
        });
        return items;
    }

    function ResetGame() {
        characters = gameCharacters.slice(0);
        player = "";
        enemy = "";
        LoadCharacters();
        LoadPlayer();
        LoadEnemy();
        Message();
    }

    function LoadCharacters(){
        $("#choices").empty();
        characters.forEach(character => {
            BuildCard(character, "choices");
        });
    }

    function BuildCard(character, divId) {
        var card = $("<div class='col-sm card select-card'>");
        card.attr("value", character.name);

        var cardTitle = $("<h5 class='cardTitle'>");
        cardTitle.text(character.name);
        var cardImg = $("<img class='img'>");
        cardImg.attr("src", "./assets/images/" + character.name + ".jpg");
        var cardStats = $("<p class='stats'>");
        cardStats.text(character.health);

        card.append(cardTitle);
        card.append(cardImg);
        card.append(cardStats);

        $("#" + divId).append(card);
    }

    function RemoveCharacter(name) {
        var newCol = [];
        characters.forEach(chara => {
            if (chara.name != name) {
                newCol.push(chara);
            }
        });
        characters = newCol;
    }

    $(document).on("click", ".select-card", function () {
        console.log("clicked " + $(this).attr("value"));

        characters.forEach(item => {
            if (item.name === $(this).attr("value")) {
                if (typeof (player) === "string" || player.health === 0) {
                    player = item;
                    RemoveCharacter(player.name);
                    LoadPlayer();
                }
                else if (typeof (enemy) === "string" || enemy.health ===0) {
                    enemy = item;
                    RemoveCharacter(enemy.name);
                    LoadEnemy();
                }
            }
        });
        LoadCharacters();
        Message();
    });

    function LoadPlayer(){
        if(player != ""){
        $("#player-img").attr("src", "./assets/images/" + player.name + ".jpg")
        $("#player-health").text(player.health + " / " + player.maxHealth);
        $("#player-attack").text(player.attackMin);
        $("#player-health-bar").width(((player.health/player.maxHealth)*100) + "%");
        $("#player-attack-range").text(player.attackRange);
        $("#player").removeClass("hidden");}
        else {
            $("#player").addClass("hidden");
        }
    };

    function LoadEnemy(){
        if(enemy != ""){
        $("#enemy-img").attr("src", "./assets/images/" + enemy.name + ".jpg")
        $("#enemy-health").text(enemy.health + " / " + enemy.maxHealth);
        $("#enemy-attack").text(enemy.attackMin);
        $("#enemy-health-bar").width(((enemy.health/enemy.maxHealth)*100) + "%");
        $("#enemy-attack-range").text(enemy.attackRange);
        $("#enemy").removeClass("hidden");
        $("#attack").removeClass("hidden");
        }
        else {
            $("#enemy").addClass("hidden");
        }
    };

    function attack(character, attack){
        character.health -= attack;
    }

    $("#attack").click(function (){
        if(enemy.health <= 0 || player.health <= 0){return;}
        console.log(player.attackMin + " " + Math.floor(Math.random() * player.attackRange));
        enemy.health -= (player.attackMin + Math.floor(Math.random() * player.attackRange));
        player.attackMin += Math.floor(Math.random() * 3) + 1;
        if(enemy.health <= 0){
            enemy.health = 0;
            $("#attack").addClass("hidden");
        }
        else{ //enemy can attack
            player.health -= (enemy.attackMin + Math.floor(Math.random() * enemy.attackRange));
            if(player.health<0){
                player.health = 0;
            }
        }
        LoadEnemy();
        LoadPlayer();
        Message();
        
    });

    $("#reset").click(function(){
        ResetGame();
    })

    ResetGame();

});