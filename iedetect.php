<?php
/*
Plugin Name: IE Detector
Description: Erkennt alte Internet Explorer und empfiehlt dem User, einen aktuelleren Browser zu installieren.
Version: 1.1.1
Author: cubetech GmbH
Plugin URI:  https://github.com/cubetech/wordpress.iedetect
Author URI:  http://www.cubetech.ch/
*/

wp_enqueue_script('ieinfobar', plugins_url(basename(dirname(__FILE__))) . '/ieinfobar.js', array(), false, true);
wp_localize_script('ieinfobar', 'iedetect', array('url'=>plugins_url(basename(dirname(__FILE__)))));

?>
