

$(document).ready(function () {
    //create a list of characters


    var player;
    var enemy;
    var characters;

    function Message() {
        var message = "";
        if (player === "") {
            message = "Choose your Character";
        }
        else if (characters.length === 0 && enemy.health <= 0) {
            message = "You WIN!";
        }
        else if (enemy === "" || enemy.health === 0) {
            message = "Choose your Enemy";
        }
        else if (player.health === 0) {
            message = "You Lose";
        }
        else {
            message = "Lets Play";
        }
        $("#message").text(message);
    }

    function CopyCol(col) {
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
        LoadCharacter("#player", player);
        LoadCharacter("#enemy", enemy);
        Message();
    }

    function LoadCharacters() {
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
        if(player !== "" && player.health === 0){return;}

        characters.forEach(item => {
            if (item.name === $(this).attr("value")) {
                if (typeof (player) === "string" || player.health === 0) {
                    player = jQuery.extend(true, {}, item);
                    RemoveCharacter(player.name);
                    LoadCharacter("#player", player);
                }
                else if (typeof (enemy) === "string" || enemy.health === 0) {
                    enemy = jQuery.extend(true, {}, item);
                    RemoveCharacter(enemy.name);
                    LoadCharacter("#enemy", enemy);
                }
            }
        });

        ResetAttack();
        LoadCharacters();
        if (enemy !== "" && player !== "") { }
        Message();
    });

    function LoadCharacter(characterDiv, chara) {
        if (chara != "") {
            $(characterDiv).find(".char-img").attr("src", "./assets/images/" + chara.name + ".jpg");
            $(characterDiv).find(".char-health").text(chara.health + " / " + chara.maxHealth);
            $(characterDiv).find(".char-attack-base").text(chara.attackMin);
            $(characterDiv).find(".health-bar").css("width", ((chara.health / chara.maxHealth) * 100) + "%");
            $(characterDiv).find(".char-attack-range").text(chara.attackRange);

            $(characterDiv).removeClass("hidden");
        }
        else {
            $(characterDiv).addClass("hidden");
        }
    }

    function attack(defender, attacker) {
        defender.health -= (attacker.attackMin + Math.floor(Math.random() * attacker.attackRange));

    }

    function ResetAttack() {
        console.log(enemy);
        console.log(player);
        if (enemy === "" || player === "" || enemy.health === 0 || player.health === 0) {
            $("#attack").addClass("hidden");
        }
        else {
            $("#attack").removeClass("hidden");
        }
        Message();
    }

    $("#attack").click(function () {
        if (enemy.health <= 0 || player.health <= 0) { return; }
        
        enemy.health -= (player.attackMin + Math.floor(Math.random() * player.attackRange));
        player.attackMin += Math.floor(Math.random() * 3) + 1;
        if (enemy.health <= 0) {
            enemy.health = 0;
        }
        else { //enemy can attack
            player.health -= (enemy.attackMin + Math.floor(Math.random() * enemy.attackRange));
            if (player.health < 0) {
                player.health = 0;
            }
        }
        LoadCharacter("#enemy", enemy);
        LoadCharacter("#player", player);
        ResetAttack();

    });

    $("#reset").click(function () {
        ResetGame();
    })

    ResetGame();

});