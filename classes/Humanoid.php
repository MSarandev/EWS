<?php
/**
 * Created by PhpStorm.
 * User: MaxSarandev
 * Date: 31/01/2018
 * Time: 13:45
 */

class Humanoid
{
    /**
     * Generic class to define all humanoid objects in the game
     */

    public $level; // contains the object's level
    public $health; // contains the object's health
    public $attack_power; // contains the object's attack power
    public $defence; // contains the object's defence stat
    public $armour_level; // contains the total armour level
    public $head_slot; // contains the item in the head slot
    public $body_slot; // contains the item in the body slot
    public $legs_slot; // contains the item in the legs slot
    public $weapon_slot; // contains the item in the weapon slot
    public $gold; // contains the amount of gold
    public $pos_x; // the object's position on the horizontal axis
    public $pos_y;

    // Getter/Setter below

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
    public function getHealth()
    {
        return $this->health;
    }

    /**
     * @param mixed $health
     */
    public function setHealth($health)
    {
        $this->health = $health;
    }

    /**
     * @return mixed
     */
    public function getAttackPower()
    {
        return $this->attack_power;
    }

    /**
     * @param mixed $attack_power
     */
    public function setAttackPower($attack_power)
    {
        $this->attack_power = $attack_power;
    }

    /**
     * @return mixed
     */
    public function getDefence()
    {
        return $this->defence;
    }

    /**
     * @param mixed $defence
     */
    public function setDefence($defence)
    {
        $this->defence = $defence;
    }

    /**
     * @return mixed
     */
    public function getArmourLevel()
    {
        return $this->armour_level;
    }

    /**
     * @param mixed $armour_level
     */
    public function setArmourLevel($armour_level)
    {
        $this->armour_level = $armour_level;
    }

    /**
     * @return mixed
     */
    public function getHeadSlot()
    {
        return $this->head_slot;
    }

    /**
     * @param mixed $head_slot
     */
    public function setHeadSlot($head_slot)
    {
        $this->head_slot = $head_slot;
    }

    /**
     * @return mixed
     */
    public function getBodySlot()
    {
        return $this->body_slot;
    }

    /**
     * @param mixed $body_slot
     */
    public function setBodySlot($body_slot)
    {
        $this->body_slot = $body_slot;
    }

    /**
     * @return mixed
     */
    public function getLegsSlot()
    {
        return $this->legs_slot;
    }

    /**
     * @param mixed $legs_slot
     */
    public function setLegsSlot($legs_slot)
    {
        $this->legs_slot = $legs_slot;
    }

    /**
     * @return mixed
     */
    public function getWeaponSlot()
    {
        return $this->weapon_slot;
    }

    /**
     * @param mixed $weapon_slot
     */
    public function setWeaponSlot($weapon_slot)
    {
        $this->weapon_slot = $weapon_slot;
    }

    /**
     * @return mixed
     */
    public function getGold()
    {
        return $this->gold;
    }

    /**
     * @param mixed $gold
     */
    public function setGold($gold)
    {
        $this->gold = $gold;
    }

    /**
     * @return mixed
     */
    public function getPosX()
    {
        return $this->pos_x;
    }

    /**
     * @param mixed $pos_x
     */
    public function setPosX($pos_x)
    {
        $this->pos_x = $pos_x;
    }

    /**
     * @return mixed
     */
    public function getPosY()
    {
        return $this->pos_y;
    }

    /**
     * @param mixed $pos_y
     */
    public function setPosY($pos_y)
    {
        $this->pos_y = $pos_y;
    } // the object's position on the vertical axis


    // Constructors below

    /**
     * Humanoid constructor.
     * @param $level
     * @param $health
     * @param $attack_power
     * @param $defence
     * @param $armour_level
     * @param $head_slot
     * @param $body_slot
     * @param $legs_slot
     * @param $weapon_slot
     * @param $gold
     * @param $pos_x
     * @param $pos_y
     */
    public function __construct($level, $health, $attack_power, $defence, $armour_level, $head_slot, $body_slot, $legs_slot, $weapon_slot, $gold, $pos_x, $pos_y)
    {
        $this->level = $level;
        $this->health = $health;
        $this->attack_power = $attack_power;
        $this->defence = $defence;
        $this->armour_level = $armour_level;
        $this->head_slot = $head_slot;
        $this->body_slot = $body_slot;
        $this->legs_slot = $legs_slot;
        $this->weapon_slot = $weapon_slot;
        $this->gold = $gold;
        $this->pos_x = $pos_x;
        $this->pos_y = $pos_y;
    }
}