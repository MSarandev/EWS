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
$mi1 = new Humanoid();
$mi2 = new Humanoid();
$mi3 = new Humanoid();
$mi4 = new Humanoid();

// set the names
$mi1->setName("Minion1");
$mi2->setName("Minion2");
$mi3->setName("Minion3");
$mi4->setName("Minion4");


// create an array with the values
$min_array = [$mi1->getName(), $mi2->getName(), $mi3->getName(), $mi4->getName()];

// Respond to AJAX
if($_POST['param']==="names"){
    // return the names
    echo $min_array[1];
}