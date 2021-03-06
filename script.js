$(document).ready(function() {
    // set the context
    var canvas = $("#main_plot");
    var ctx = canvas[0].getContext("2d");
    var c_wrapper = $("#canvas_wrapper"); // div wrapper

    //player data
    var player_x = 0;
    var player_y = 0;
    var player_alive = true; // default
    var player_health_max; // default
    var player_health_current; // default
    var player_defence_max; // default
    var player_defence_current; // default
    var player_attack_power = 1; // DEFAULT
    var player_name = "Falcon";
    // ranking details holder
    var ranking_data = [];
    // tile prefix for generation
    var t_prefix = "tile_";
    // tile max number
    var tile_max = 35;
    // last used tile index
    var last_tile = 2;
    // tile pick random
    var pick_rand = 1;
    // control the room generation
    var exit_room = 10;
    // boss controller
    var boss_alive = true;
    // minion count
    var minion_count = 4; // default all alive
    // returned data
    var names_list = []; // used later
    var names_list_c = 0; // counter
    var health_list = [];
    var hlc = 0; // health list counter
    var gc1 = 0; // generic counter
    var pos_list = [];
    var plc = 0; // position list counter
    var gc2 = 0; // generic counter
    var boss_details = [];
    // door control
    var draw_doors = true; // default
    var rooms_cleared = 0; // define the var
    var minion_health_updated = false; // default
    var boss_health_updated = false; // default
    var health_potion_counter = 1; // default
    var max_potions = 10;
    // death screen counters
    var sword_swings = 0; // swings
    var minions_killed = 0; // minions kills
    // data pull requests
    var data_pull_requests = 0;
    // upgradable items file prefix
    var up_item_pfix = "lvl";
    // gear counters
    var item_level_head = 0; // default
    var item_level_chest = 0; // default
    var item_level_weapon = 0; // default
    // XP counter
    var current_xp = 0; // default
    var max_xp = 50; // default for level 1
    var current_level = 1; //default
    var block_width = 1; // default
    var block_value = 1;
    var item_modal_shown = false; // default
    var item_dropped = "0"; // default


    /**
        LOAD THE GAME DATA
        AJAX function to fetch all data from PHP
     *
     * Couldn't achieve it all with one function
     * Several separate functions below
     *
     */

    // fetch names AJAX request
    function fetchNames(){
        $.ajax({
            method: "POST",
            url: "classes/GameLogic.php",
            data: { param: "names" }, // parse what we're looking for
            success: function(data){
                // process the data
                names_list = data.split(',');
            },
            error:function () {
                console.log("Error: Name retrieval");
            }
        });
    }

    // fetch health AJAX request
    function fetchHealth(){
        $.ajax({
            method: "POST",
            url: "classes/GameLogic.php",
            data: { param: "health" }, // parse what we're looking for
            success: function(data){
                // process the data
                health_list = data.split(',');
            },
            error:function () {
                console.log("Error: Health retrieval");
            }
        });
    }

    // fetch the positions
    function fetchPositions(){
        $.ajax({
            method: "POST",
            url: "classes/GameLogic.php",
            data: { param: "pos" }, // parse what we're looking for
            success: function(data){
                // process the data
                pos_list = data.split(',');
            },
            error:function () {
                console.log("Error: Pos retrieval");
            }
        });
    }

    // fetch boss details
    function fetchBoss() {
        $.ajax({
            method: "POST",
            url: "classes/GameLogic.php",
            data: { param: "boss" }, // parse what we're looking for
            success: function(data){
                // process the data
                boss_details = data.split(',');
            },
            error:function () {
                console.log("Error: Boss retrieval");
            }
        });
    }

    // de-clutter the draw function
    function checkCounters(counter, max){
        if(counter<max-1){
            counter++;
        }else{
            counter=0;
        }

        return counter;
    }

    // generate the floor tiles
    function generateFloorTiles(redraw) {
        // for the array of tiles, pick one style
        pick_rand = Math.floor((Math.random() * tile_max) + 1);

        // declare all
        var tile_file_name;
        var tile_img;
        var wall_img;
        var i = 0;
        var j = 0;
        var door_img = new Image();
        door_img.src = "resources/tiles/wall/door.png";
        var door_h_img = new Image();
        door_h_img.src = "resources/tiles/wall/door_h.png";

        if(redraw!==true) {
            if (last_tile !== pick_rand) {
                // CREATE NEW TILE SET, USE THE RANDOM NUMBER

                // we haven't used this tile before

                // set as last used tile (so we don't use it again)
                last_tile = pick_rand;

                // fetch the tile with prefix
                tile_file_name = t_prefix + pick_rand.toString() + ".png";
                tile_img = new Image();
                // set the source
                tile_img.src = "resources/tiles/" + tile_file_name;

                // define the wall image
                wall_img = new Image();
                wall_img.src = "resources/tiles/wall/wall.png";

                // generate the floor
                for (i = 0; i < 1020; i += 30) { // increment 29, for the height of the tile
                    // for columns
                    for (j = 0; j < 510; j += 30) { // increment 29 for the width of the tile
                        // for rows

                        // Draw the tile floor first
                        // context, draw the tile
                        ctx.drawImage(tile_img, i, j, 30, 30);

                        // check if we need to draw a wall
                        if(j===0 || j===480){
                            if(i===480){
                                if(draw_doors===true){
                                    // draw the door
                                    ctx.drawImage(door_h_img, i, j, 30, 30);
                                }
                            }else{
                                // first row, draw wall
                                ctx.drawImage(wall_img, i, j, 30, 30);
                            }
                        }else if(30<j<450) {
                            // mid rows, draw first/last block
                            if(j===240){
                                // draw the door
                                if(draw_doors===true) {
                                    ctx.drawImage(door_img, 0, j, 30, 30);
                                    ctx.drawImage(door_img, 990, j, 30, 30);
                                }
                            }else{
                                ctx.drawImage(wall_img, 0, j, 30, 30);
                                ctx.drawImage(wall_img, 990, j, 30, 30);
                            }
                        }
                    }
                }
            }
        }else{
            // RE-DRAW WITH THE SAME TILE (PLAYER MOVED IN BOUNDS)

            // fetch the tile with prefix
            tile_file_name = t_prefix + last_tile.toString() + ".png";
            tile_img = new Image();
            // set the source
            tile_img.src = "resources/tiles/" + tile_file_name;

            // define the wall image
            wall_img = new Image();
            wall_img.src = "resources/tiles/wall/wall.png";

            // generate the floor
            for (i = 0; i < 1020; i += 30) { // increment 29, for the height of the tile
                // for columns
                for (j = 0; j < 510; j += 30) { // increment 29 for the width of the tile
                    // for rows

                    // Draw the tile floor first
                    // context, draw the tile
                    ctx.drawImage(tile_img, i, j, 30, 30);

                    // check if we need to draw a wall
                    if(j===0 || j===480){
                        if(i===480){
                            if(draw_doors===true) {
                                // draw the door
                                ctx.drawImage(door_h_img, i, j, 30, 30);
                            }
                        }else{
                            // first row, draw wall
                            ctx.drawImage(wall_img, i, j, 30, 30);
                        }
                    }else if(30<j<450) {
                        // mid rows, draw first/last block
                        if(j===240){
                            if(draw_doors===true) {
                                // draw the door
                                ctx.drawImage(door_img, 0, j, 30, 30);
                                ctx.drawImage(door_img, 990, j, 30, 30);
                            }
                        }else{
                            ctx.drawImage(wall_img, 0, j, 30, 30);
                            ctx.drawImage(wall_img, 990, j, 30, 30);
                        }
                    }
                }
            }
        }
    }

    // room generation function
    function roomGeneration() {
        // check if the player is in the room
        // INITIAL GENERATION BELOW (exit_room = 10)
        // SHOULD BE OPTIMISED SOON
        if(exit_room===10){
            // draw the floor
            generateFloorTiles();

            // RESET
            exit_room = 0;
        }else if(exit_room===1){
            // reset
            exit_room = 0;

            // draw the floor
            generateFloorTiles();
        }
    }

    // update the rooms cleared indicator
    function roomsCleared() {
        // increment
        rooms_cleared++;

        // find the element and change the val
        $("#rooms_cleared").text("Rooms cleared: " + rooms_cleared.toString());
    }

    // simplify the larger function
    function quickDraw(ex){
        if(ex === 1){
            // THE PLAYER IS OUT OF BOUNDS, CREATE NEW ROOM

            // call to update
            roomsCleared();

            // reset both vars, enable health increment
            boss_health_updated = false;
            minion_health_updated = false;

            // reset the variable
            boss_alive = true;

            // pull the details again
            // fetch the names from PHP
            fetchNames();

            // fetch the health
            fetchHealth();

            // fetch the positions
            fetchPositions();

            // fetch the boss
            fetchBoss();

            // reset the doors
            draw_doors = true;

            // call the room generation function
            roomGeneration(1);

            // draw the player
            drawPlayer(player_x,player_y);

            // update the loot dialog
            item_modal_shown = false;
        }else{
            // THE PLAYER IS WITHIN BOUNDS

            // re-draw the same floor
            generateFloorTiles(true);

            // draw the player
            drawPlayer(player_x,player_y);
        }
    }

    // draw player function
    function drawPlayer(x,y) {
        // declare all
        var path_to_img = "resources/player/player_static.png";
        var player_img;
        player_img = new Image();
        player_img.src = path_to_img;

        ctx.drawImage(player_img, x, y, 55, 65);

/**
 *
 * The code below works, but not as intended. Could be fixed.
 * Reverted to v..13 draw
 *
        // check the player's orientation
        if(x<468){
            // looking right

            // context draw image
            ctx.drawImage(player_img, x, y, 55, 65);
        }else{
            // looking left

            // change to the other image
            player_img.src = "resources/player/player_l.png";

            // context draw image
            ctx.drawImage(player_img, x, y, 55, 65);
        }
 */

        // Extra info to draw
        ctx.font = "16px Cabin";
        ctx.fillStyle = "#fff";
        //draw name
        ctx.fillText(player_name,
            x+2, y +75);
        // draw health
        ctx.fillText(player_health_current+"/"+player_health_max,
                    x+5, y +95);

    }

    // draw the boss function
    function drawBoss() {
        // set the minion image element
        var boss_img = new Image();
        boss_img.src = "resources/enemies/boss.png";
        // Extra info to draw
        ctx.font = "16px Cabin";
        ctx.fillStyle = "#fff";

        // coordinates counter
        var y_counter = parseInt(boss_details[3]);
        var x_counter = parseInt(boss_details[2]);

        // check if the boss is alive
        if(boss_details[0]!=="DEAD" && boss_alive===true){
            // Draw the boss
            ctx.drawImage(boss_img, x_counter, y_counter, 120, 165);
            //draw name
            ctx.fillText(boss_details[0],x_counter+35, y_counter -15);
            // check for cleared rooms
            if(rooms_cleared!==0 && boss_health_updated===false){
                var new_health = parseInt(boss_details[1]) + current_level*10 +
                    player_attack_power*10 + rooms_cleared*5;

                // update the array
                boss_details[1] = new_health;


                if(new_health<1000) {
                    // draw health
                    ctx.fillText(new_health.toString(), x_counter + 45, y_counter);
                }else{
                    var instant_health = parseInt(new_health)/1000;

                    ctx.fillText(instant_health.toString()+"k", x_counter + 45, y_counter);
                }
                // update the var
                boss_health_updated = true;
            }else {
                // draw health
                ctx.fillText(boss_details[1], x_counter + 45, y_counter);
            }
        }
    }

    // draw the minions function
    function drawMinion(minion_count){
        // set the minion image element
        var minion_img = new Image();
        minion_img.src = "resources/enemies/minion.png";
        // Extra info to draw
        ctx.font = "16px Cabin";
        ctx.fillStyle = "#fff";

        // coordinates counter
        var x_counter = pos_list[gc2];
        var y_counter = pos_list[gc2+1];

        // draw 4 minions across from the player

        // reset before we begin
        gc1 = 0;

        for(var i=0;i<minion_count;i++){
            // get the number of elements in the arrays
            names_list_c = names_list.length;
            hlc = health_list.length;
            plc = pos_list.length;

            // set the counters, for the other elements' positions
            // the control box below is necessary, as there are 2 pos (x,y) for each other element
            // ...it's quick and dirty - I'll fix it, promise
            if(gc1===0){
                x_counter = parseInt(pos_list[0]);
                y_counter = parseInt(pos_list[1]);
            }else{
                x_counter = parseInt(pos_list[gc1+gc1]);
                y_counter = parseInt(pos_list[gc1+gc1+1]);
            }

            if(names_list[gc1]!=="DEAD" || health_list[gc1]>0){
                // to the right of the player, in equal Y intervals
                ctx.drawImage(minion_img, x_counter, y_counter, 50, 75);
                //draw name
                ctx.fillText(names_list[gc1],x_counter+2, y_counter +75);
                // check for cleared rooms
                if(rooms_cleared!==0 && minion_health_updated===false){
                    // update the health
                    var new_health = parseInt(health_list[gc1]) + rooms_cleared;

                    // update the array
                    health_list[gc1] = new_health;

                    // draw health
                    ctx.fillText(new_health.toString(), x_counter + 5, y_counter + 95);

                    // update the variable
                    minion_health_updated = true;
                }else {
                    // draw health
                    ctx.fillText(health_list[gc1], x_counter + 5, y_counter + 95);
                }
            }

            // increment all counters
            gc1 = checkCounters(gc1,hlc); // health
            //gen_counter = checkCounters(gen_counter,names_list_c); // names
            //gc2 = checkCounters(gc2, plc-3); // positions
        }
    }

    // attack function (player only ATM)
    function swingSword(){
        // check if the player was close to a minion

        var minion_x = 0; // comparison value
        var minion_y = 0; // comparison value

        // pull the boss details too
        var boss_x = parseInt(boss_details[2]);
        var boss_y = parseInt(boss_details[3]);

        // go through all elements in the pos array (Minion check)
        for (var i = 0; i < pos_list.length; i+=2) {
            // set the values
            minion_x = pos_list[i];
            minion_y = pos_list[i+1];

            if(player_x+20===minion_x-20 || player_x+10===minion_x-10 &&
                minion_y-10< player_y >minion_y+10){
                // the minion is to the right of the player
                // in good sword swinging distance

                // decrease the health of the minion
                if(i!==0) {
                    health_list[i-1] = health_list[i-1] - player_attack_power;

                    // update the XP
                    addXP("sword_swing");
                }else if(i === 0){
                    health_list[0] = health_list[0] - player_attack_power;

                    // update the XP
                    addXP("minion_dead");
                }

                if(health_list[i-1]<=0 || health_list[0]<= 0){
                    // Minion dead (yay)

                    if(i!==0) {
                        names_list[i-1] = "DEAD";
                    }else if(i === 0){
                        names_list[0] = "DEAD";
                    }

                    // increment the counter
                    minions_killed++;

                    // update the XP
                    addXP("minion_dead");
                }

                // roll the dice on the item drop
                var rand_drop = Math.floor((Math.random() * player_defence_max) + 1);

                if(rand_drop===2){
                    // Lucky, drop item
                    dropItem(2);
                }

                break;
            }
        }


        // Check if swinging at Boss
        if(player_x+20===boss_x-20 || player_x+10===boss_x-10 &&
            boss_y-10< player_y >boss_y+10){
            // the boss is to the right of the player
            // in good sword swinging distance

            // decrease the health of the boss
           boss_details[1] = boss_details[1] - player_attack_power;

            if(boss_details[1]<=0 || boss_details[1]<= 0){
                // Boss dead (yay)

                // update the XP
                addXP("boss_dead");

                // rename the boss
                boss_details[0] = "DEAD";

                // adjust variable
                boss_alive = false;

                // open the doors
                draw_doors = false;

                // drop an item
                dropItem(2);

                // drop a gear upgrade, maybe...
                rand = Math.floor((Math.random() * player_defence_current) + 1);

                if(rand === 5){
                    // lucky, drop item
                    dropBossItem(1);
                }else{
                    // unlucky, that happens too
                    dropBossItem(0);
                }
            }
        }

        // strike the player back, maybe...
        var rand = Math.floor((Math.random() * player_defence_current) + 1);

        if(rand === 5 || rand === 3){
            // unlucky, strike back
            strikeBack();
        }

        // update the swing counter
        sword_swings++;

        // update the potion UI
        updatePotions();

        // Finally call draw again, to show the damage
        draw();
    }

    // enemies attack function
    function strikeBack() {
        // check if the player is alive
        if(player_health_current!==0){
            // strike
            player_health_current--;
        }else if(player_health_current<=0){
            // HE'S DEAD JIM
            player_alive = false;
            // call the function
            playerDied();
        }
    }

    // drink a health potion
    function drinkHealthPotion(){

        // check if the player has any
        if(health_potion_counter!==0) {
            // decrease the counter
            health_potion_counter--;

            // increase the health
            player_health_current = player_health_max;

            // update the UI
            $("#potion_counter").text(health_potion_counter);

            // update the max
            max_potions--;

            // update
            draw();
        }else{
            alert("You're out of potions");
        }
    }

    // update the potion counter
    function updatePotions() {
        // update the health potion
        $("#potion_counter").text(health_potion_counter);
    }

    // drop item
    function dropItem(number) {
        // at the moment, drop health potions only
        // check if carrying max
        if(max_potions<10) {
            // increment the potion counter
            health_potion_counter += number;

            // increment the limiter
            max_potions++;
        }

        // show the animation
        itemDropAnimation("potion_counter");
    }

    // drop a custom item (Boss only)
    function dropBossItem(param) {
        var text = $("#item_info_text"); // define the element
        var img = $("#boss_item_img"); // define the element

        // have we shown the dialog before
        if(item_modal_shown===false) {
            // check the drop rate
            if (param !== 3) {
                // drop item confirmed

                // roll the dice on the type of item
                var rand_drop = Math.floor((Math.random() * 3) + 1);

                if (rand_drop === 1) {
                    // HEAD

                    // check if the head slot is at max level
                    if (item_level_head < 10) {
                        // increment
                        item_level_head++;

                        // define the img src
                        img.attr("src", "resources/items/head/" + up_item_pfix + item_level_head + ".png");

                        // define the text element
                        text.text("You looted a level " + item_level_head + " head armour");

                        // update the loot value holder
                        item_dropped = rand_drop.toString() + item_level_head.toString();
                    } else {
                        // TODO: EXPAND THIS
                        // drop nothing (for now)

                        // define the img src
                        img.attr("src","resources/items/empty.png");

                        // define the text element
                        text.text("Spiders are loot technically...");
                    }
                } else if (rand_drop === 2) {
                    // CHEST

                    // check if the head slot is at max level
                    if (item_level_chest < 10) {
                        // increment
                        item_level_chest++;

                        // define the img src
                        img.attr("src","resources/items/chest/" + up_item_pfix + item_level_chest + ".png");

                        // define the text element
                        text.text("You looted a level " + item_level_chest + " chest armour");

                        // update the loot value holder
                        item_dropped = rand_drop.toString() + item_level_chest.toString();
                    } else {
                        // TODO: EXPAND THIS
                        // drop nothing (for now)

                        // define the img src
                        img.attr("src","resources/items/empty.png");

                        // define the text element
                        text.text("Spiders are loot technically...");
                    }
                } else if (rand_drop === 3) {
                    // WEAPON

                    // check if the head slot is at max level
                    if (item_level_weapon < 10) {
                        // increment
                        item_level_weapon++;

                        // define the img src
                        img.attr("src","resources/items/weapons/swords/" + up_item_pfix + item_level_weapon + ".png");

                        // define the text element
                        text.text("You looted a level " + item_level_weapon + " sword");

                        // update the loot value holder
                        item_dropped = rand_drop.toString() + item_level_weapon.toString();
                    } else {
                        // TODO: EXPAND THIS
                        // drop nothing (for now)

                        // define the img src
                        img.attr("src","resources/items/empty.png");

                        // define the text element
                        text.text("Spiders are loot technically...");
                    }

                }

            }

            // finally, show the dialog
            $("#new_item_modal").modal('show');

            // update the var
            item_modal_shown = true;
        }
    }

    // equip the new item
    function equipItem(){
        // split the var
        var item = item_dropped.toString().substr(0,1);
        var lvl = item_dropped.toString().substr(1, item_dropped.length-1);
        var img; // define

        // check what item to equip
        switch (item.toString()) {
            case "1":
                // HEAD
                img = $("#head_sock_img");

                // change the src
                img.attr("src", "resources/items/head/lvl"+lvl.toString()+".png");

                break;
            case "2":
                // CHEST
                img = $("#chest_sock_img");

                // change the src
                img.attr("src", "resources/items/chest/lvl"+lvl.toString()+".png");

                break;
            case "3":
                // WEAPON
                img = $("#weapon_sock_img");

                // change the src
                img.attr("src", "resources/items/weapons/swords/lvl"+lvl.toString()+".png");

                break;
            default:
                break;
        }

    }

    // item drop animation
    function itemDropAnimation(element) {
        // define the element
        var el = $("#"+element);

        // init the animation
        el.animate({
                fontSize: '3em'}, "fast",
            function () {
                // reverse the animation effects
                el.animate({
                    fontSize: '1rem'}, "slow");
            });
    }

    // death screen drawing
    function playerDied(){
        // disable the canvas
        canvas.attr("disabled", "disabled");

        // update the elements
        $("#death_info_1").text("Sword swings: " + sword_swings);
        $("#death_info_2").text("Minions slayed: " + minions_killed);
        $("#death_info_3").text("Rooms traversed: " + rooms_cleared);

        // open the death modal
        $("#player_died_modal").modal('show');
    }

    // add player data to database
    function addToRankings(){
        var control_data;
        var username = $("#player_name_txt").val();

        if(username!==""){
            // not empty, matches regex

            // create an AJAX request to push to the DB
            $.ajax({
                method: "POST",
                url: "classes/GameLogic.php",
                data: { param: "data_push", name: username, rooms: rooms_cleared }, // parse what we're looking for
                success: function(data){
                    // process the data
                    control_data = data;

                    // check the returned data
                    if(control_data==="Op complete"){
                        // everything OK

                        // hide this modal
                        $("#player_died_modal").modal('hide');

                        // show the try again modal
                        $("#try_again_modal").modal('show');
                    }
                },
                error:function () {
                    console.log("Error: Ranking push failed");
                }
            });
        }else{
            // alert to the issue
            alert("We need your name, before saving");
            // clear the value
            $("#player_name_txt").val("");
        }
    }

    // pull the ranking data
    function pullRankingData(){
        // AJAX request for data pull
        $.ajax({
            method: "POST",
            url: "classes/GameLogic.php",
            data: { param: "data_pull" }, // parse what we're looking for
            success: function(data){
                // process the data
                ranking_data = data.split(',');
            },
            error:function () {
                console.log("Error: Ranking Details retrieval");
            }
        });
    }

    // display ranking data
    function displayRankings() {
        // check if not empty
        if(ranking_data.length !== 0){
            // define the vars
            var username;
            var rooms;
            var rank = 1;

            // for each player in the ranks
            for(var i=0;i<ranking_data.length-1;i++){
                username = ranking_data[i];
                rooms = ranking_data[i+1];

                // add new list item
                $("#ranking_list").append("<li class='list-group-item'>"+rank+" | Name:"+username+" | Rooms:"+rooms+"</li>");

                // increment
                i++;
                rank ++;
            }
        }else if(ranking_data.length !== 0 && data_pull_requests<2){
            // TODO: KNOWN ISSUE
            // data pull failed, try again (up to 2 times)
            pullRankingData();
            displayRankings();
        }

        // increment
        data_pull_requests++;
    }

    // try again function
    function tryAgain() {
        // reload the page
        window.location.reload();
    }

    // level up animation control
    function levelUpAnim() {
        // define the element
        var el = $("#level_holder_p");

        // init the animation
        el.animate({
            fontSize: '3em',
            display: 'inline-block',
            color: "#FF0003"}, "fast",
            function () {
            // reverse the animation effects
                el.animate({
                fontSize: '1rem',
                display: 'block',
                color: "#fff"}, "slow");
        });
    }

    // update the level counter
    function updateLvlCounter(new_lvl){
        $("#level_holder_p").text("Level: " + new_lvl);
    }

    // increment the xp bar
    function addXP(en_type){
        // check if the player leveled up

        // define the bonus XP amount
        var bonus = rooms_cleared*2;
        var xp_bar = $("#xp_bar");
        var xp_details = $("#xp_detail");

        if(current_xp < max_xp-1){
            // check what the player did
            if(en_type==="sword_swing"){
                // add a small amount
                current_xp += 5 + bonus;

                // update the block value
                block_value += 5*block_width;

                // update the progress bar (5 blocks)
                xp_bar.css("width", block_value+"%");
            }else if(en_type==="minion_dead"){
                // add some more xp
                current_xp += 10 + bonus;

                // update the block value
                block_value += 10*block_width;

                // update the progress bar (10 blocks)
                xp_bar.css("width", block_value+"%");
            }else if(en_type==="boss_dead"){
                // add XL amount of xp
                current_xp += 30 + bonus;

                // update the block value
                block_value += 30*block_width;

                // update the progress bar (30 blocks)
                xp_bar.css("width", block_value+"%");
            }

            // update the details
            xp_details.text(current_xp + "/" + max_xp);
        }else{
            // the player leveled up

            // update the counter
            current_level += 1;

            // reset the counter
            if(current_xp-max_xp>0){
                current_xp = current_xp-max_xp;
            }else{
                // FAIL SAFE
                current_xp = 0;
            }

            // calculate the new block width
            block_width = 100/max_xp;

            // reset the block value
            block_value = 0;

            // update the XP reqs.
            max_xp += 50 + rooms_cleared;

            // call for visual animation
            levelUpAnim();

            // update the UI
            updateLvlCounter(current_level);

            // update the progress bar
            xp_bar.css("width", current_xp+"%");

            // update the details
            xp_details.text(current_xp + "/" + max_xp);

            // give the player more attack power
            addPower();
        }
    }

    // increment the player def/attack
    function addPower(){
        // define the elements
        var attack_index = $("#attack_index");
        var defence_index = $("#defence_index");

        // increment by level
        player_attack_power  = 10 + current_level;

        // plus a constant
        player_defence_current = 10 + current_level;

        // update the UI
        attack_index.text(player_attack_power);
        defence_index.text(player_defence_current + "(passive)");

        // animate the changes

        // init the animation
        attack_index.animate({
                fontSize: '3em',
                display: 'inline',
                backgroundColor: "#FF0003"}, "fast",
            function () {
                // animate the defence
                defence_index.animate({
                    fontSize: '3em',
                        display: 'inline',
                    backgroundColor: "#FF0003"}, "fast",
                    function () {
                        // reverse the attack index
                        attack_index.animate({
                            fontSize: '1rem',
                            display: 'block',
                            backgroundColor: "transparent"}, "slow",
                            function () {
                            // reverse the defence
                                defence_index.animate({
                                    fontSize: '1rem',
                                    display: 'block',
                                    backgroundColor: "transparent"}, "slow");
                            });
                    });
            });
    }

    // main draw function
    function draw() {
        //draw the player
        if(player_x > -1 && player_x < 935 &&
            player_y > -1 && player_y < 425){
            // if the player is within the boundaries
            quickDraw(0);

            // draw the minions
            drawMinion(minion_count);
            // draw the boss
            drawBoss();
        }else{
            // check if the player has killed all bosses
            if(boss_alive!==true) {
                // check where to push
                if (player_x === 935) {
                    // reset x
                    player_x = 0;
                    // update the room gen
                    exit_room = 1;
                    // draw again
                    quickDraw(1);
                } else if (player_y === 425) {
                    // reset y
                    player_y = 0;
                    // update the room gen
                    exit_room = 1;
                    // draw again
                    quickDraw(1);
                }
                if (player_x < 0) {
                    // reset x to max
                    player_x = 935;
                    // update the room gen
                    exit_room = 1;
                    // draw again
                    quickDraw(1);
                } else if (player_y < 0) {
                    // reset y to max
                    player_y = 425;
                    // update the room gen
                    exit_room = 1;
                    // draw again
                    quickDraw(1);
                }
            }else{
                // the boss is still alive
                // show "alert"
                $("#alert_modal").modal('show');

                // reset the position
                player_x = 30;
                player_y = 30;

                // re-draw
                quickDraw(0);
            }
        }

        // Increase frame and redraw
        //frame++;
        //requestAnimationFrame( draw );
    }


    /**
     *
     * Player name submission below
     *
     */



    /**
     MAIN CONTROL FUNCTIONS BELOW
     */

    //move on key press (ARROW KEYS)
    c_wrapper.keydown(function(event) {
        switch (event.which) {
            case 97:
            case 37:
                // LEFT
                player_x-=10;
                ctx.clearRect(0, 0, 1000, 1000);
                draw();
                break;
            case 100:
            case 39:
                // RIGHT
                player_x+=10;
                ctx.clearRect(0, 0, 1000, 1000);
                draw();
                break;
            case 115:
            case 40:
                // DOWN
                player_y+=10;
                ctx.clearRect(0, 0, 1000, 1000);
                draw();
                break;
            case 119:
            case 38:
                // UP
                player_y-=10;
                ctx.clearRect(0, 0, 1000, 1000);
                draw();
                break;
            default:
                break;
        }
    });

    //move on key press (WASD KEYS)
    c_wrapper.keypress(function(event) {
        switch (event.which) {
            case 97:
                // LEFT
                player_x-=10;
                ctx.clearRect(0, 0, 1000, 1000);
                draw();
                break;
            case 100:
                // RIGHT
                player_x+=10;
                ctx.clearRect(0, 0, 1000, 1000);
                draw();
                break;
            case 115:
                // DOWN
                player_y+=10;
                ctx.clearRect(0, 0, 1000, 1000);
                draw();
                break;
            case 119:
                // UP
                player_y-=10;
                ctx.clearRect(0, 0, 1000, 1000);
                draw();
                break;
            default:
                break;
        }
    });

    /**
     Attach click to allow attack
     */
    $("#main_plot").click(function () {
       // call to function
       swingSword();
    });


    /**

        Attach click to allow potion drinking

     */

    $("#sock_1").click(function () {
       drinkHealthPotion();
    });
    /**
     ON INITIALISATION (GAME START)
     */

    // set the params
    // CHANGE TO PHP CONNECT
    player_health_max = 10;
    player_defence_max = 10;
    player_health_current = 10;
    player_defence_current = 10;

    // draw once on init
    draw();
    generateFloorTiles();
    drawPlayer(30,30);

    // fetch the names from PHP
    fetchNames();

    // fetch the health
    fetchHealth();

    // fetch the positions
    fetchPositions();

    // fetch the boss
    fetchBoss();

    // show the number of potions
    $("#potion_counter").text(health_potion_counter);

    // show the health
    $("#health_index").text(player_health_max);

    // show the defence power
    $("#defence_index").text(player_defence_max + "   (passive)");

    // show the attack power
    $("#attack_index").text(player_attack_power);

    // show the rooms cleared
    $("#rooms_cleared").text(rooms_cleared);

    // bind the equip item button
    $("#button_equip_item").click(function () {
       equipItem();
    });

    // show the lore modal
    $('#lore_modal').modal('show');

    // Pull the ranking data
    pullRankingData();
    displayRankings();

    // attach the data pull to the close modal button
    $("#close_modal_btn").click(function () {
        // Pull the ranking data
        pullRankingData();
        displayRankings();

        // trigger a click twice, to force focus and draw
        var element = $("#main_plot");
        var e = jQuery.Event("keypress");
        e.which = 100; // defines keycode
        element.focus().trigger(e); // triggers keypress
        element.focus().trigger(e); // triggers keypress
    });

    // attach the save rankings to the modal button
    $("#save_player_data_btn").click(function () {
       addToRankings();
    });

    // attach the try again function to the button
    $("#try_again_btn").click(function () {
       tryAgain();
    });
});