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
    <link rel="stylesheet" href="login_src/style.css">

    <!-- Local JS and jQuery -->
    <script src="jquery-3.3.1.js"></script>
    <script src="login_src/script.js" type="text/javascript"></script>

    <title>DC - Login</title>
</head>
<body>
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


<!-- Login container -->
<div class="col justify-content-center" id="login_container">
    <h1>Dungeon Crawler</h1>

</div>

<!-- Modal -->
<div class="modal fade" id="login_modal" tabindex="-1"
     role="dialog" aria-labelledby="login_modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="login_modal_content">
            <div class="modal-header">
                <h5 class="modal-title" id="login_modal_title">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body justify-content-center">
                <div class="row justify-content-center">
                    <div class="w-100"></div>
                    <label for="user_txt">Username</label>
                    <div class="w-100"></div>
                    <input type="text" id="user_txt" placeholder="Username">
                    <div class="w-100"></div>
                    <label for="user_txt">Password</label>
                    <div class="w-100"></div>
                    <input type="password" id="pass_txt" placeholder="Password">
                    <div class="w-100"></div>
                </div>
            </div>
            <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-primary" id="login_btn">Login</button>
                <button type="button" class="btn btn-secondary" id="register_btn">Register</button>
            </div>
        </div>
    </div>
</div>

</body>
</html>