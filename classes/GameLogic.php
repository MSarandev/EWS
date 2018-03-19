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

// include the DB connection file
include('../src/db_conn.php');

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

    // db_conn is defined externally

    // test the connection
    if (!$db_conn) {
        die('Could not connect: ' . mysqli_error($db_conn));
    }

    // create the SQL
    $sql = "Select * from userrankingtable";

    // fetch result
    if ($result = $db_conn->query($sql)) {

        /* fetch object array */
        while ($row = $result->fetch_row()) {
            echo $row[1], ",", $row[2], ",";
        }

        /* free result set */
        $result->close();
    }

    mysqli_close($db_conn);
}elseif($_POST['param']==="data_push"){
    // adding a new player to the ranking

    $player_name = $_POST['name']; // get the name from the request
    $rooms_cleared = (int)$_POST['rooms']; // get the number of rooms

    // double check the contents
    if(ctype_alnum($player_name)){
        // create the SQL query

        // the query tries to update the record, if it exists, otherwise - create new
        $sql = "INSERT INTO userrankingtable (username, roomsCleared) VALUES('$player_name', $rooms_cleared)";

        // test the connection
        if (!$db_conn) {
            die('Could not connect: ' . mysqli_error($db_conn));
        }

        // run the query
        mysqli_query($db_conn,$sql)
        or die(mysqli_error($db_conn));

        // control echo
        echo "Op complete";

        // close the conn
        mysqli_close($db_conn);
    }
}