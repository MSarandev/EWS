<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 13:59
 */

class Boss extends Minion
{
    /**
     * Defines the boss NPC class
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
    } // defines the item dropped by the boss


}