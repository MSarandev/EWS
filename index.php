<!-- Created by Maxim Sarandev, bootstrap template, Copyright 2018 -->
<!-- ART BY: http://www.thepinsta.com -->
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=yes">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Local CSS -->
    <link rel="stylesheet" href="style.css">

    <!-- Local JS and jQuery -->
    <script src="jquery-3.3.1.js"></script>
    <script src="script.js" type="text/javascript"></script>

    <title>Dungeon Crawler</title>
</head>
<body>
    <div class="container-fluid justify-content-center">
        <h1>Dungeon Crawler v. 1.1</h1>
    </div>


    <div class="container-fluid h-100">
        <div class="row justify-content-center h-100">
            <div class="col-8 order-first h-100">
                <div class="row" id="canvas_wrapper" tabindex="1">
                    <canvas id="main_plot" width="1000px" height="500px"></canvas>
                </div>
                <div class="row">
                    <div class="col-2 justify-content-center">
                        <div class="row justify-content-center align-items-center" id="char_container">
                            <p id="character_name">Falcon</p>
                            <img src="resources/player/player_char_select.gif"
                                 width="400"/>
                        </div>
                    </div>
                    <!-- Contains the inventory -->
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="w-100"></div>
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="col-sm i_sock">Item socket</div>
                            <div class="col-sm i_sock">Item socket</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 order-last h-100">
                <div class="col-xl-9 order-last h-100">
                    <div class="row justify-content-center"
                         id="stats_container">
                        <!-- Contains the current stats -->
                        <div class="row-md">
                            <img id="health_bar" width="77" height="298"
                                    src="resources/player/bars/health/full.png">
                            <img id="defence_bar" width="77" height="298"
                                 src="resources/player/bars/defence/full.png">
                        </div>
                        <div class="w-100 d-none d-sm-block"></div>
                        <div class="row-sm justify-content-end">
                            <p id="attack_index">Attack power: 10</p>
                            <div class="w-100 d-none d-sm-block"></div>
                            <p id="defence_index">Defence power: 10</p>
                            <div class="w-100 d-none d-sm-block"></div>
                            <p id="rooms_cleared">Rooms cleared: 0</p>
                        </div>
                </div>
                    <div class="row" id="ranking_container">
                        <!-- Contains the ranking system -->
                        Ranking
                    </div>
            </div>
        </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="jquery-3.3.1.js"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>

    <!-- Lore Modal (from Bootstrap example) -->
    <div class="modal" id="lore_modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document" id="lore_modal_dialog">
            <div class="modal-content" id="lore_modal_content">
                <div class="modal-header justify-content-center">
                    <h2 class="modal-title" id="lore_modal_title">Dungeon Crawler Lore</h2>
                    <button type="button" class="close"
                            data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>A quantum physics professor has invented a time machine, wanting to go back in time to purchase Apple shares.
                    One dark night he steps into the machine, cash in hand, and presses the button.
                    Blinded by his urge to be a billionaire, he does not notice the novel he was reading was
                    still inside of the machine.
                    “Dark Times” told a story about a mad king in the 10th century that built an endless dungeon
                    of rooms, for his prisoners to be left to die in.</p>
                    <p>The professor opens his eyes, but instead of seeing Silicone Valley,
                    he is in a dark room lit by torches.
                    He looks at his arms and realises he is in a knight’s armour.
                    Suddenly it dawns on him – he has been incarnated in Falcon’s body.
                    Falcon was once a trusted knight with the mad king,
                    but was thrown down the dungeon for treason.</p>
                    <p>The professor realises he is doomed to wander in rooms for eternity.
                    Seeking death’s release in the next room,<br> and the next room,<br> and the next room …</p>
                </div>
                <div class="modal-footer justify-content-center">
                    <img src="https://media.giphy.com/media/NUlBlZ17ATe1y/giphy.gif"
                        width="150"/>
                    <button type="button"
                            class="btn btn-dark btn-lg"
                            data-dismiss="modal">Good luck doomed one</button>
                    <img src="https://media.giphy.com/media/NUlBlZ17ATe1y/giphy.gif"
                         width="150"/>
                </div>
            </div>
        </div>
    </div>

    <!-- Boss alive modal (general warning)-->
    <div class="modal" tabindex="-1" role="dialog" id="alert_modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content" id="alert_modal_content">
                <div class="modal-header">
                    <h2 class="modal-title"
                        id="alert_modal_title">I ran away in fear</h2>
                    <button type="button" class="close"
                            data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>I see you tried to run away in fear.
                    This is not uncommon, I must confess. Many others like <strong>you</strong> have tried it before.
                    <br>To exit this room you need to slay the boss first.
                    <br><br>To punish your attempt to run away, you're going back to the start...</p>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button"
                            class="btn btn-dark btn-lg"
                            data-dismiss="modal">Face your fears</button>
                </div>
            </div>
        </div>
    </div>

    <!--Footer-->
    <footer class="footer">
        <!--Copyright-->
        <div class="container-fluid justify-content-center">
            (build 1.1.21) | © 2018 Copyright:
                <a href="https://www.linkedin.com/in/msarandev/"> Maxim Sarandev </a>
            |
            <a href="https://github.com/MSarandev">
                <img src="http://www.smallbutdigital.com/static/media/twitter.png"
                     width="40"/>
            </a>
        </div>
        <!--/Copyright-->

    </footer>
</body>
</html>