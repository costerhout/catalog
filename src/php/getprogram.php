<?php
# @Author: Colin Osterhout <ctosterhout> from example provided by Course Leaf / Leap Frog
# @Date:   2017-06-02T15:22:57-08:00
# @Email:  ctosterhout@alaska.edu
# @Project: catalog
# @Last modified by:   ctosterhout
# @Last modified time: 2017-06-05T11:26:54-08:00

header('Content-type: text/xml');
$code = $_GET["code"];
$response = file_get_contents("http://uas-alaska-preview.courseleaf.com/ribbit/?page=getprogram.rjs&code=" . urlencode($code));
print($response);
?>