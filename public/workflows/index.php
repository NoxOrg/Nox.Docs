<?php

/**
 * This script searches the current directory for files ending with '.nox.yaml'
 * and returns their name, size, and shaChecksum in a JSON format
 */

$tenant = end( explode('/', trim( $_SERVER['REQUEST_URI'], '/' )));

if (empty($tenant)) {
    http_response_code(404);
    die();
}

$directory = '/home/noxorg/public_ftp/incoming/' . $tenant . '/'; 

if (!is_dir($directory)) {
    http_response_code(404);
    die();
}

// Initialize an empty array to store the file data
$file_data = array();

// Search the directory for files ending with '.nox.yaml'
$files = glob($directory . '/*.nox.yaml');

// Loop through the files
foreach ($files as $file) {
    
    // Get the file size
    $size = filesize($file);

    // Get the SHA checksum of the file
    $shaChecksum = hash_file('sha256', $file);

    // Add the file data to the array
    $file_data[] = array(
        'name' => basename($file),
        'size' => $size,
        'shaChecksum' => $shaChecksum
    );
}

// Convert the file data to JSON and output it
header('Content-Type: application/json');
echo json_encode($file_data);

?>