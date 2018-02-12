$(document).ready(function() {
    // set the context
    var canvas = $("#main_plot");
    var ctx = canvas[0].getContext("2d");
    var c_wrapper = $("#canvas_wrapper"); // div wrapper

    //player data
    var player_x = 0;
    var player_y = 0;
    // tile prefix for generation
    var t_prefix = "tile_";
    // tile max number
    var tile_max = 35;
    // last used tile index
    var last_tile = 0;
    // tile pick random
    var pick_rand = 1;
    // control the room generation
    var exit_room = 10;
    // current animation
    var cur_anim = "idle";

    // generate the floor tiles
    function generateFloorTiles(redraw) {
        // for the array of tiles, pick one style
        pick_rand = Math.floor((Math.random() * tile_max) + 1);

        // declare all
        var tile_file_name;
        var tile_img;
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

                // generate the floor
                for (i = 0; i < 1020; i += 30) { // increment 29, for the height of the tile
                    // for columns
                    for (j = 0; j < 510; j += 30) { // increment 29 for the width of the tile
                        // for rows

                        // context, draw the tile
                        ctx.drawImage(tile_img, i, j, 30, 30);
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

            // generate the floor
            for (i = 0; i < 1020; i += 30) { // increment 29, for the height of the tile
                // for columns
                for (j = 0; j < 510; j += 30) { // increment 29 for the width of the tile
                    // for rows

                    // context, draw the tile
                    ctx.drawImage(tile_img, i, j, 30, 30);
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
        var path_to_img = "resources/player/idle.png";
        var player_img;
        player_img = new Image();
        player_img.src = path_to_img;

        // context draw image
        ctx.drawImage(player_img, x, y, 55, 65);
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
        if(player_x > -1 && player_x < 990 &&
            player_y > -1 && player_y < 500){
            // if the player is within the boundaries
            quickDraw(0);
        }else{
            // check where to push
            if(player_x===990){
                // reset x
                player_x = 0;
                // update the room gen
                exit_room = 1;
                // draw again
                quickDraw(1);
            }else if(player_y===500){
                // reset y
                player_y = 0;
                // update the room gen
                exit_room = 1;
                // draw again
                quickDraw(1);
            }
            if(player_x < 0){
                // reset x to max
                player_x = 980;
                // update the room gen
                exit_room = 1;
                // draw again
                quickDraw(1);
            }else if(player_y < 0){
                // reset y to max
                player_y = 490;
                // update the room gen
                exit_room = 1;
                // draw again
                quickDraw(1);
            }
        }
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
     ON INITIALISATION (GAME START)
     */

    // draw once on init
    draw();
    generateFloorTiles();
});