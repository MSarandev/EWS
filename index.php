<?php session_start(); ?>
<!-- Created by Maxim Sarandev, Bootstrap template, Copyright 2018 -->
<!-- ART BY: http://www.thepinsta.com -->
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, shrink-to-fit=yes">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

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
                            <div class="col-sm i_sock" id="sock_1">
                                <!-- Health Potion -->
                                <div class="row justify-content-center">
                                    <img src="resources/items/h_potion.png"
                                         width="50" height="50">
                                    <p id="potion_counter">2</p>
                                </div>
                            </div>
                            <div class="col-sm i_sock" id="sock_2">Item socket</div>
                            <div class="col-sm i_sock" id="sock_3">Item socket</div>
                            <div class="col-sm i_sock" id="sock_4">Item socket</div>
                            <div class="col-sm i_sock" id="sock_5">Item socket</div>
                            <div class="w-100"></div>
                            <div class="col-sm i_sock" id="sock_6">Item socket</div>
                            <div class="col-sm i_sock" id="sock_7">Item socket</div>
                            <div class="col-sm i_sock" id="sock_8">Item socket</div>
                            <div class="col-sm i_sock" id="sock_9">Item socket</div>
                            <div class="col-sm i_sock" id="sock_10">Item socket</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 order-last h-100">
                <div class="col-xl-9 order-last h-100">
                    <div class="row justify-content-center"
                         id="stats_container">
                        <!-- Contains the current stats -->
                        <h2>Your stats, knight</h2>
                        <div class="row ml-5">
                            <img src="https://cdn3.iconfinder.com/data/icons/retro-game-items/100/retro-11-512.png"
                                 width="50" height="50">
                            <p class="ml-2" id="health_index">Health: 10</p>

                            <div class="w-100 d-none d-sm-block"></div>

                            <img src="http://piq.codeus.net/static/media/userpics/piq_168286_400x400.png"
                                 width="50" height="50">
                            <p class="ml-2" id="attack_index">Attack power: 10</p>

                            <div class="w-100 d-none d-sm-block"></div>

                            <img src="http://piq.codeus.net/static/media/userpics/piq_242464_400x400.png"
                                 width="50" height="50">
                            <p class="ml-2" id="defence_index">Defence power: 10</p>

                            <div class="w-100 d-none d-sm-block"></div>

                            <img src="http://pixelartmaker.com/art/52c306f0214cb6d.png"
                                 width="50" height="50">
                            <p class="ml-2" id="rooms_cleared">Rooms cleared: 0</p>
                        </div>
                </div>
                    <div class="row justify-content-center" id="ranking_container">
                        <!-- Contains the ranking system -->
                        <div class="row w-100">
                            <h2>The league of the dead</h2>
                        </div>
                        <div class="row w-100 h-100">
                            <ul id="ranking_list" class="list-group list-group-flush align-items-start">
                                <li class="list-group-item w-100">
                                    <span class="badge badge-dark badge-pill"> 1 </span>
                                    Test TEST TEST TEST
                                </li>
                                <li class="list-group-item w-100">
                                    <span class="badge badge-dark badge-pill"> 2 </span>
                                    Test TEST TEST TEST
                                </li>
                            </ul>
                        </div>
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
                            data-dismiss="modal" id="close_modal_btn">Good luck doomed one</button>
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

    <!-- Player died modal -->
    <div class="modal" tabindex="-1" role="dialog" id="player_died_modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content" id="player_died_modal_content">
                <div class="modal-header">
                    <h2 class="modal-title"
                        id="player_died_modal_title">One with the spirits</h2>
                </div>
                <div class="modal-body">
                    <p>So, you met your demise. Your time in the flesh earned you:</p>
                    <p id="death_info_1">1</p>
                    <p id="death_info_2">2</p>
                    <p id="death_info_3">3</p>
                    <label for="player_name_txt">Enter your name, for others to ponder upon your success</label>
                    <input type="text" id="player_name_txt" placeholder="Your name here">
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button"
                            class="btn btn-dark btn-lg"
                            id="save_player_data_btn">Forever remember my failures</button>
                </div>
            </div>
        </div>
    </div>

    <!--Footer-->
    <footer class="footer">
        <!--Copyright-->
        <div class="container-fluid justify-content-center">
            (build 1.2.07) | © 2018 Copyright:
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