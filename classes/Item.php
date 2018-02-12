<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 14:00
 */

class Item
{
    /**
     * Defines the item class
     */

    public $attack_stat; // contains the attack stat of the item
    public $defence_stat; // contains the defence stat of the item
    public $level; // contains the item level
    public $rarity;


    // Getter/Setter

    /**
     * @return mixed
     */
    public function getAttackStat()
    {
        return $this->attack_stat;
    }

    /**
     * @param mixed $attack_stat
     */
    public function setAttackStat($attack_stat)
    {
        $this->attack_stat = $attack_stat;
    }

    /**
     * @return mixed
     */
    public function getDefenceStat()
    {
        return $this->defence_stat;
    }

    /**
     * @param mixed $defence_stat
     */
    public function setDefenceStat($defence_stat)
    {
        $this->defence_stat = $defence_stat;
    }

    /**
     * @return mixed
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * @param mixed $level
     */
    public function setLevel($level)
    {
        $this->level = $level;
    }

    /**
     * @return mixed
     */
    public function getRarity()
    {
        return $this->rarity;
    }

    /**
     * @param mixed $rarity
     */
    public function setRarity($rarity)
    {
        $this->rarity = $rarity;
    } // contains the rarity of the item


    // Constructor below

    /**
     * Item constructor.
     * @param $attack_stat
     * @param $defence_stat
     * @param $level
     * @param $rarity
     */
    public function __construct($attack_stat, $defence_stat, $level, $rarity)
    {
        $this->attack_stat = $attack_stat;
        $this->defence_stat = $defence_stat;
        $this->level = $level;
        $this->rarity = $rarity;
    }

}