<?php

/**
 * This script searches the tenant directory for files ending with '.nox.yaml'
 * and returns an index with their name, size, and shaChecksum in a JSON format
 *
 * It returns the file contents if the file name is specified in the URL
 */
 
$thisFolder = join('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)).'/';

$targetFile = $_SERVER['REQUEST_URI'];

if (substr($targetFile, 0, strlen($thisFolder)) !== $thisFolder) {
    http_response_code(406);
    die();
}

[$tenant,$file] = explode('/',substr($targetFile, strlen($thisFolder)));

if (empty($tenant)) {
    http_response_code(404);
    die();
}*

$tenantDirectory = '/home/noxorg/public_ftp/incoming/' . $tenant . '/'; 

if(empty($file)) {

    if (!is_dir($tenantDirectory)) {
        http_response_code(404);
        die();
    }
    header('Content-Type: text/x-yaml');
    displayIndex($tenantDirectory);
}
else {
    
    $fullFilePath = $tenantDirectory.'/'.$file;
    
    if (!file_exists($tenantDirectory)) {
        http_response_code(404);
        die();
    }
    ob_clean();
    header('Content-Type: text/x-yaml');
    echo file_get_contents($fullFilePath);
}

function displayIndex($tenantDirectory) {
    

    // Initialize an empty array to store the file data
    $file_data = array();

    // Search the directory for files ending with '.nox.yaml'
    $files = glob($tenantDirectory . '/*.nox.yaml');

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
  
}



?>
