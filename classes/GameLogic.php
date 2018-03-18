<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 14:04
 */
// import the class
require_once('Humanoid.php');
require_once('Boss.php');

/**
 * This class contains the main game logic
 */

// create the name holder
$pl_name = "Falcon";

// create four minions
$mi1 = new Humanoid("Arthur",5,470,90);
$mi2 = new Humanoid("Jaina",5,510,180);
$mi3 = new Humanoid("Theo",5,400,270);
$mi4 = new Humanoid("Skeletor",5,550,360);

// create a boss
$bs1 = new Boss("Lucky", 10, 750, 180);


// create an array with the values
$min_array = [$mi1,$mi2,$mi3,$mi4];

// Respond to AJAX
if($_POST['param']==="names"){
    // return the names
    foreach ($min_array as $minion) {
        echo $minion->getName(), ",";
    }
}elseif($_POST['param']==="health"){
    // get the health of the minions
    // return the names
    foreach ($min_array as $minion) {
        echo $minion->getHealth(), ",";
    }

}elseif($_POST['param']==="pos") {
    // get the health of the minions
    // return the names
    foreach ($min_array as $minion) {
        echo $minion->getPosX(), ",",
             $minion->getPosY(), ",";
    }
}elseif($_POST['param']==="boss"){
    // return all boss details
    echo $bs1->getName(), ",",
         $bs1->getHealth(), ",",
         $bs1->getPosX(), ",",
         $bs1->getPosY();
}elseif($_POST['param']==="data_pull"){
    // pull the ranking data from the DB

    $dbconn = pg_connect("host=localhost dbname=EWS user=postgres password=postgres")
    or die('Could not connect: ' . pg_last_error());

    // Performing SQL query
    $query = 'SELECT "Username","Rooms_cleared" FROM public.user_ranking_table';
    $result = pg_query($query) or die('Query failed: ' . pg_last_error());

    // Printing results in HTML
    while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
        foreach ($line as $col_value) {
            echo $col_value, ",";
        }
    }

    // Free resultset
    pg_free_result($result);

    // Closing connection
    pg_close($dbconn);
}