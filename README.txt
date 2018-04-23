EWS Application Overview
------------------------
Due to the complex nature of
this application, I will list
all of the implementation features
here. (As recommended on Demo day)

------------------------
------------------------
-> Room setup
------------------------
. Each room has a dynamically generated
flooring, picking from a list of over 100
different floor panels.

. Each room is programmatically populated
with enemies, with increasingly higher stats
(health, attack power)

. The player can exit the room, only when the boss
is killed

. Room progression is allowed in four directions,
through the "doors"

------------------------
------------------------
-> Characters
------------------------
. All characters are contained within PHP
classes, with different attributes

. The individual classes extend two master
classes, and add unique attributes on include

. The player class was initially designed as
a class object, but was later generated programmatically
within the JavaScript file

. Not all features of the classes were implemented, 
although supported by the base class

. All characters have base level stats, based around the 
player's character values (attack power, defence etc.)

. All enemy stats are updated and increased upon a room
progression, to make it more difficult for the player to 
kill them (programmatically)

------------------------
------------------------
-> Player
------------------------
. The player is programmatically created within the
main JavaScript file

. The player is given a health value, that is 
unchanged throughout the game

. The player has an attack power and a defence status.
These can change throughout the game, with different
weapons, gears and potions

. The defence status of the player is used passivelly to 
decrease the amount of damage taken and decrease the chance
of getting a hit back from an enemy

. The defence status passivelly increases the chance of 
an "item drop" by the enemies. The higher the status,
the higher the chance of a drop

. Three item slots have been implemented: Head, Chest and Weapon

. Each slot can use a range of items from level 1 - level 10

. The player starts with a base gear, that carries no perks

. Each item carries passive perks, to increase "drop rate", reduce
hits from enemies etc.

. The system is built to allow for multiple slots additions, different
armour items, different weapon types etc. can be easily added

. The player can "level up" progressing through each level by killing minions
and bosses

. The XP is increased on each level

. Rewards for "leveling up" were intended, but not implemented,
although the undelying logic is present

------------------------
------------------------
-> Potions
------------------------
. A potion handling function was created to create and
use potions within the game

. At the moment, only a health potion is available

. The way the potion system was implemented allows for
easy and quick addition of new potions, with different 
effects on the player

------------------------
------------------------
-> Other functionality
------------------------
. The applcation creates, draws and updates the canvas
area with propriotery functions (custom built)

. The applcation monitors all activity and updates on 
any action taken

. The calculations are done in "real-time" and are applied
immidiatelly

. An attempt to animate certain elements has been made

. Bootstrap was used to optimise the game area

. The web app is tested on mobile and performs as expected

. Rigourous testing was performed to optimise the application

. A custom draw/re-draw function had to be created, to concerve
computational power usage

. All custom functions have been optimised to operate as fast 
as possible

. All server connection, database connection services have been
optimised and operate to the highest degree of security

------------------------
------------------------
Online functionality
------------------------
. The application implements an online functionality
by storing the maximum score a player has achieved in a database

. The players can strive to achieve higher scores than their
counterparts

------------------------
------------------------
Intended functionality
------------------------
. Allow "looting" of places other people have "died", by placing
gravestones with names in the coresponding room number

. Randomly assign different sprites for each enemy type

. A further player sprite customisation (skins)

. Login system, player dashboard and auction house 
