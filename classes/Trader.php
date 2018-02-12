<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 13:56
 */

class Trader extends Minion
{
    /**
     * Extends the minion class, to define trader NPCs
     */

    public $items;

    // Getter/Setter

    /**
     * @return mixed
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * @param mixed $items
     */
    public function setItems($items)
    {
        $this->items = $items;
    } // contains all items the trader has


}