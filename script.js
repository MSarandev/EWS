$(document).ready(function() {
    // set the context
    var canvas = $("#main_plot");
    var ctx = canvas[0].getContext("2d");
    var c_wrapper = $("#canvas_wrapper"); // div wrapper

    //player data
    var player_x = 0;
    var player_y = 0;

    // simplify the larger function
    function quickDraw(){
        // draw again
        ctx.fillStyle = 'red';
        ctx.fillRect(player_x,player_y,10,10);
    }

    // main draw function
    function draw() {
        //draw the player
        if(player_x > -1 && player_x < 990 &&
            player_y > -1 && player_y < 500){
            // if the player is within the boundaries
            quickDraw();
            $("#ranking_container").html(player_x + "," + c_wrapper.width() + player_y);
        }else{
            // check where to push
            if(player_x==990){
                // reset x
                player_x = 0;
                // draw again
                quickDraw();
            }else if(player_y==500){
                // reset y
                player_y = 0;
                // draw again
                quickDraw();
            }
            if(player_x < 0){
                // reset x to max
                player_x = 980;
                // draw again
                quickDraw();
            }else if(player_y < 0){
                // reset y to max
                player_y = 490;
                // draw again
                quickDraw();
            }
        }
    }

    // draw once
    draw();

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
});