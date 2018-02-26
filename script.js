$(document).ready(function() {
    // set the context
    var canvas = $("#main_plot");
    var ctx = canvas[0].getContext("2d");
    var c_wrapper = $("#canvas_wrapper"); // div wrapper

    //player data
    var player_x = 0;
    var player_y = 0;
    var player_health_max;
    var player_health_current;
    var player_defence_max;
    var player_defence_current;
    var player_attack_power = 1; // DEFAULT
    var player_name = "Falcon";
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
    // current animation
    var cur_anim = "idle";
    // boss controller
    var boss_alive = true;
    var boss_health = 20; // default
    // frame data
    var frame = 0;
    // minion count
    var minion_count = 4; // default all alive
    var minion_health = 10; // default
    // returned data
    var names_list = []; // used later
    var names_list_c = 0; // counter
    var gen_counter = 0; // another generic counter
    var health_list = [];
    var hlc = 0; // health list counter
    var gc1 = 0; // generic counter
    var pos_list = [];
    var plc = 0;
    var gc2 = 0;


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

                // define the door image
                door_img = new Image();
                door_img.src = "resources/tiles/wall/door.png";

                // define the horizontal door image
                door_h_img = new Image();
                door_h_img.src = "resources/tiles/wall/door_h.png";

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
                                // draw the door
                                ctx.drawImage(door_h_img, i, j, 30, 30);
                            }else{
                                // first row, draw wall
                                ctx.drawImage(wall_img, i, j, 30, 30);
                            }
                        }else if(30<j<450) {
                            // mid rows, draw first/last block
                            if(j===240){
                                // draw the door
                                ctx.drawImage(door_img, 0, j, 30, 30);
                                ctx.drawImage(door_img, 990, j, 30, 30);
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

            // define the door image
            door_img = new Image();
            door_img.src = "resources/tiles/wall/door.png";

            // define the horizontal door image
            door_h_img = new Image();
            door_h_img.src = "resources/tiles/wall/door_h.png";

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
                            // draw the door
                            ctx.drawImage(door_h_img, i, j, 30, 30);
                        }else{
                            // first row, draw wall
                            ctx.drawImage(wall_img, i, j, 30, 30);
                        }
                    }else if(30<j<450) {
                        // mid rows, draw first/last block
                        if(j===240){
                            // draw the door
                            ctx.drawImage(door_img, 0, j, 30, 30);
                            ctx.drawImage(door_img, 990, j, 30, 30);
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

    // simplify the larger function
    function quickDraw(ex){
        if(ex === 1){
            // THE PLAYER IS OUT OF BOUNDS, CREATE NEW ROOM

            // call the room generation function
            roomGeneration(1);

            // draw the player
            drawPlayer(player_x,player_y);
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
    function drawBoss(boss_health) {
        // set the minion image element
        var boss_img = new Image();
        boss_img.src = "resources/enemies/boss.png";
        // Extra info to draw
        ctx.font = "16px Cabin";
        ctx.fillStyle = "#fff";

        // coordinates counter
        var y_counter = 180;
        var x_counter = 750;

        // Draw the boss

        ctx.drawImage(boss_img, x_counter, y_counter, 120, 165);
        //draw name
        ctx.fillText("BOSS",x_counter+35, y_counter -15);
        // draw health
        ctx.fillText(boss_health,x_counter+45, y_counter);
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

        // generic
        var i = 0;

        // draw 4 minions across from the player

        // reset before we begin
        gc1 = 0;

        for(i=0;i<minion_count;i++){
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
                // draw health
                ctx.fillText(health_list[gc1],x_counter+5, y_counter +95);
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

        var inner_x = 0; // comparison value
        var inner_y = 0; // comparison value

        // go through all elements in the pos array
        for (var i = 0; i < pos_list.length; i+=2) {
            // set the vals
            inner_x = pos_list[i];
            inner_y = pos_list[i+1];

            if(player_x+20===inner_x-20 || player_x+10===inner_x-10 &&
                inner_y-10< player_y >inner_y+10){
                // the minion is to the right of the player
                // in good sword swinging distance

                // decrease the health of the minion
                if(i!==0) {
                    health_list[i-1] = health_list[i-1] - player_attack_power;
                }else if(i === 0){
                    health_list[0] = health_list[0] - player_attack_power;
                }

                if(health_list[i-1]<=0 || health_list[0]<= 0){
                    // Minion dead (yay)

                    if(i!==0) {
                        names_list[i-1] = "DEAD";
                    }else if(i === 0){
                        names_list[0] = "DEAD";
                    }
                }

                break;
            }

        }
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
            drawBoss(boss_health);
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

    // show the lore modal
    $('#lore_modal').modal('show');
});