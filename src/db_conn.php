<?php
/**
 * Created by PhpStorm.
 * User: Max Sarandev
 * Date: 19/03/2018
 * Time: 11:20
 */

define('DB_SERVER','localhost');
define('DB_USER','php_conn');
define('DB_PASS','phpconn');
define('DATABASE','local');


$db_conn = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DATABASE);
// test if connection was established, and print any errors
if($db_conn->connect_errno){
    die('<p>CONNECT FAILED -> '.$db_conn->connect_error);
}