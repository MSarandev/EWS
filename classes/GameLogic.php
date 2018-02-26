<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 14:04
 */
// import the class
require_once('Humanoid.php');

/**
 * This class contains the main game logic
 */

// create four minions
$mi1 = new Humanoid("Arthur",5,470,90);
$mi2 = new Humanoid("Jaina",5,510,180);
$mi3 = new Humanoid("Theo",5,400,270);
$mi4 = new Humanoid("Skeletor",5,550,360);


// create an array with the values
$min_array = [$mi1,$mi2,$mi3,$mi4];

// Respond to AJAX
if($_POST['param']==="names"){
    // return the names
    foreach ($min_array as $minion) {
        echo $minion->getName();
        echo ",";
    }
}elseif($_POST['param']==="health"){
    // get the health of the minions
    // return the names
    foreach ($min_array as $minion) {
        echo $minion->getHealth();
        echo ",";
    }

}elseif($_POST['param']==="pos") {
    // get the health of the minions
    // return the names
    foreach ($min_array as $minion) {
        echo $minion->getPosX();
        echo ",";
        echo $minion->getPosY();
        echo ",";
    }

}elseif($_POST['param']==="check_hit"){
    // check if the player hit an enemy
    echo "not done yey";
}