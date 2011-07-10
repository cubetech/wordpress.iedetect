<?php
/*
 Plugin Name: IE Detector
 Description: Erkennt den IE6 und IE7 und empfiehlt dem User, einen aktuelleren Browser zu installieren.
 Version:     1.0
 Author:      cubetech.ch
 Plugin URI:  http://www.cubetech.ch/products/iedetect
 Author URI:  http://www.cubetech.ch/
 */

wp_enqueue_script('ieinfobar', plugins_url(basename(dirname(__FILE__))) . '/ieinfobar.js', array(), false, true);
wp_localize_script('ieinfobar', 'iedetect', array('url'=>plugins_url(basename(dirname(__FILE__)))));

?>
