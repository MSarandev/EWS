<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 14:02
 */

class Zone
{
    /**
     * Main zone class
     */

    public $name; // contains the zone name
    public $level_span; // contains the level spectrum of the zone
    public $num_bosses; // contains the number of bosses in the zone
    public $num_traders; // contains the number of traders in the zone
    public $num_minions;

    // Getter/Setters

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getLevelSpan()
    {
        return $this->level_span;
    }

    /**
     * @param mixed $level_span
     */
    public function setLevelSpan($level_span)
    {
        $this->level_span = $level_span;
    }

    /**
     * @return mixed
     */
    public function getNumBosses()
    {
        return $this->num_bosses;
    }

    /**
     * @param mixed $num_bosses
     */
    public function setNumBosses($num_bosses)
    {
        $this->num_bosses = $num_bosses;
    }

    /**
     * @return mixed
     */
    public function getNumTraders()
    {
        return $this->num_traders;
    }

    /**
     * @param mixed $num_traders
     */
    public function setNumTraders($num_traders)
    {
        $this->num_traders = $num_traders;
    }

    /**
     * @return mixed
     */
    public function getNumMinions()
    {
        return $this->num_minions;
    }

    /**
     * @param mixed $num_minions
     */
    public function setNumMinions($num_minions)
    {
        $this->num_minions = $num_minions;
    } // contains the number of minions in the zone


    // Constructor below

    /**
     * Zone constructor.
     * @param $name
     * @param $level_span
     * @param $num_bosses
     * @param $num_traders
     * @param $num_minions
     */
    public function __construct($name, $level_span, $num_bosses, $num_traders, $num_minions)
    {
        $this->name = $name;
        $this->level_span = $level_span;
        $this->num_bosses = $num_bosses;
        $this->num_traders = $num_traders;
        $this->num_minions = $num_minions;
    }
}