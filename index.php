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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="script.js" type="text/javascript"></script>

    <title>Dungeon Crawler</title>
</head>
<body>
    <div class="container-fluid">
        <h1>Dungeon Crawler v. 0.1</h1>
    </div>


    <div class="container-fluid h-100">
        <div class="row justify-content-center h-100">
            <div class="col-8 order-first h-100">
                <div class="row" id="canvas_wrapper" tabindex="1">
                    <canvas id="main_plot" width="1000px" height="500px"></canvas>
                </div>
                <div class="row">
                    <div class="col-2">
                        <div class="col" id="char_container">Char Container</div>
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
                    <div class="row" id="stats_container">
                        <!-- Contains the current stats -->
                        Stats
                    </div>
                    <div class="row" id="ranking_container">
                        <!-- Contains the ranking system -->
                        Ranking
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>

    <!-- Include all the php methods -->
    <?php
    // Supporting classes

    ?>
</body>
</html>