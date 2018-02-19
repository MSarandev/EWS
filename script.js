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

    /**
        LOAD THE GAME DATA
        AJAX function to fetch all data from the PHP classes
     */



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

        // generic
        var i = 0;

        if(player_x < 468){
            // draw to the right

            ctx.drawImage(boss_img, x_counter, y_counter, 120, 165);
            //draw name
            ctx.fillText("BOSS",x_counter+35, y_counter -15);
            // draw health
            ctx.fillText(boss_health,x_counter+45, y_counter);

        }else{
            // draw to the left

            // flip the image
            boss_img.src = "resources/enemies/boss_r.png";

            // adjust counter
            x_counter = 70;

            ctx.drawImage(boss_img, x_counter, y_counter, 120, 165);
            //draw name
            ctx.fillText("BOSS",x_counter+35, y_counter -15);
            // draw health
            ctx.fillText(boss_health,x_counter+45, y_counter);
        }
    }

    // draw the minions function
    function drawMinion(minion_count, minion_health){
        // set the minion image element
        var minion_img = new Image();
        minion_img.src = "resources/enemies/minion.png";
        // Extra info to draw
        ctx.font = "16px Cabin";
        ctx.fillStyle = "#fff";

        // coordinates counter
        var y_counter = 90;
        var x_counter = 470;

        // generic
        var i = 0;

        // draw 4 minions across from the player
        if(player_x < 468){
            // draw to the right

            for(i=0;i<minion_count;i++){
                // to the right of the player, in equal Y intervals
                if(x_counter===470){
                    ctx.drawImage(minion_img, x_counter, y_counter, 50, 75);
                    //draw name
                    ctx.fillText("Minion",x_counter+2, y_counter +75);
                    // draw health
                    ctx.fillText(minion_health,x_counter+5, y_counter +95);

                    // increment
                    x_counter = 510;
                }else{
                    ctx.drawImage(minion_img, x_counter, y_counter, 50, 75);
                    //draw name
                    ctx.fillText("Minion",x_counter+2, y_counter +75);
                    // draw health
                    ctx.fillText(minion_health,x_counter+5, y_counter +95);

                    // reset
                    x_counter = 470;
                }
                y_counter+=90; // increment the position
            }
        }else{
            // draw to the left

            // flip the image
            minion_img.src = "resources/enemies/minion_r.png";

            // adjust counter
            x_counter = 370;

            // to the left of the player, in equal Y intervals
            for(i=0;i<minion_count;i++){
                // to the left of the player, in equal Y intervals
                if(x_counter===370){
                    ctx.drawImage(minion_img, x_counter, y_counter, 50, 75);
                    //draw name
                    ctx.fillText("Minion",x_counter+2, y_counter +75);
                    // draw health
                    ctx.fillText(minion_health,x_counter+5, y_counter +95);

                    // increment
                    x_counter = 250;
                }else{
                    ctx.drawImage(minion_img, x_counter, y_counter, 50, 75);
                    //draw name
                    ctx.fillText("Minion",x_counter+2, y_counter +75);
                    // draw health
                    ctx.fillText(minion_health,x_counter+5, y_counter +95);

                    // reset
                    x_counter = 370;
                }
                y_counter+=90; // increment the position
            }
        }
    }

    /**
     *
     * This is severely broken, should be fixed soon
     *
     *
     *
     *
     *
    // main animation function
    function animateMe(action) {
        // check what to animate
        if(action===1){
            // animate run
            cur_anim = "run"; // set the prefix

            // define
            var anim_counter = 0;
            var path_to_img = "resources/player/run/frame";
            var frame_counter = 1;
            var player_img;
            player_img = new Image();
            player_img.src = path_to_img+frame_counter.toString()+".png";

            while(action===1){
                // loop animation
                ctx.drawImage(player_img,player_x,player_y,55,65);
                // change the frame
                if(frame_counter<4){
                    // increment to next frame
                    frame_counter++;
                }else{
                    // reset the frames
                    frame_counter = 1;
                }

                if(anim_counter===100){
                    // break out
                    action=0;
                }

                anim_counter++;
                player_img.src = path_to_img+frame_counter.toString()+".png";
            }
        }else if(action===2){
            // animate attack
            cur_anim = "attack"; // set the prefix

        }else if(action===3){
            // animate defend
            cur_anim = "defend"; // set the prefix
        }else{
            // DEFAULT
            cur_anim = "ïdle"; // set to default

        }
    }
     */

    // main draw function
    function draw() {
        //draw the player
        if(player_x > -1 && player_x < 935 &&
            player_y > -1 && player_y < 425){
            // if the player is within the boundaries
            quickDraw(0);

            // draw the minions
            drawMinion(minion_count,minion_health);
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
        frame++;
        requestAnimationFrame(draw);
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
                //draw();
                break;
            case 100:
            case 39:
                // RIGHT
                player_x+=10;
                ctx.clearRect(0, 0, 1000, 1000);
                //draw();
                break;
            case 115:
            case 40:
                // DOWN
                player_y+=10;
                ctx.clearRect(0, 0, 1000, 1000);
                //draw();
                break;
            case 119:
            case 38:
                // UP
                player_y-=10;
                ctx.clearRect(0, 0, 1000, 1000);
                //draw();
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
                //draw();
                break;
            case 100:
                // RIGHT
                player_x+=10;
                ctx.clearRect(0, 0, 1000, 1000);
                //draw();
                break;
            case 115:
                // DOWN
                player_y+=10;
                ctx.clearRect(0, 0, 1000, 1000);
                //draw();
                break;
            case 119:
                // UP
                player_y-=10;
                ctx.clearRect(0, 0, 1000, 1000);
                //draw();
                break;
            default:
                break;
        }
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

    // show the lore modal
    $('#lore_modal').modal('show');
});