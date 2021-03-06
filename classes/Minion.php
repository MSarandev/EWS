<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 13:52
 */

require_once('Humanoid.php');

class Minion extends Humanoid
{
    /**
     * A more specific class to handle NPCs
     */

    public $zone; // defines which zone the minion is in
    public $alive;


    // Getter/Setter

    /**
     * @return mixed
     */
    public function getZone()
    {
        return $this->zone;
    }

    /**
     * @param mixed $zone
     */
    public function setZone($zone)
    {
        $this->zone = $zone;
    }

    /**
     * @return mixed
     */
    public function getAlive()
    {
        return $this->alive;
    }

    /**
     * @param mixed $alive
     */
    public function setAlive($alive)
    {
        $this->alive = $alive;
    } // defines whether the minion is alive
}