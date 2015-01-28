<?php

// Please set up a $password and comment out next string
die ("Please set up axtatic server $password");
$password = "";

sleep(0.2);

if ($_POST['password'] !== $password) {
	// wrong password
	echo ("Wrond Password! Please repeat login procedure!");
} else {
	// password is ok, save then
	$saveto = $_SERVER['DOCUMENT_ROOT'] . $_POST['saveTo'];
	$content = "<!DOCTYPE html><html>" . $_POST['html'] . '</html>';

	if (is_file($saveto)) {
		rename($saveto, $saveto . "." . time() . ".bak");
	}

	$result = file_put_contents($saveto, $content);

	if (!$result) {
		echo "File is NOT saved.";
	} else {
		echo "Ok. File saved to " . $_POST['saveTo'];
	}
}

?>