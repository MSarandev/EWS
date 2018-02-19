<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 14:04
 */

class GameLogic
{
    /**
     * This class contains the main game logic
     */

    function loadAll($x)
    {
        // the param passed is the room number the player is in

        // create 4 minions per room
        $minion1 = new Minion($x,$x,$x,$x,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1);
        $minion2 = new Minion($x,$x,$x,$x,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1);
        $minion3 = new Minion($x,$x,$x,$x,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1);
        $minion4 = new Minion($x,$x,$x,$x,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1);

        // create 1 boss per room
        $boss1 = new Boss($x,$x,$x,$x,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1,$x-1);
    }
}


// init the class
$g1 = new GameLogic();

// get the q parameter from URL
$q = $REQUEST['param'];

// call the function
g1.loadAll($q);
