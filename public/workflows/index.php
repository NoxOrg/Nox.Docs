<?php

/**
 * This script searches the current directory for files ending with '.nox.yaml'
 * and returns their name, size, and shaChecksum in a JSON format
 */
 
$thisFolder = join('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)).'/';

$targetFile = $_SERVER['REQUEST_URI'];

if (!str_starts_with($targetFile, $thisFolder)) {
    http_response_code(406);
    die();
}

$requestParameters = explode('/',substr($targetFile, strlen($thisFolder)));
//[$tenant,$requestedResource,$requestedFile] = explode('/',substr($targetFile, strlen($thisFolder)));

$tenant = $requestParameters[0];
$requestedResource = $requestParameters[1];
$requestedFile = null;

if (count($requestParameters) == 3){
    $requestedFile = $requestParameters[2];
}

echo 'tenant: ' . $tenant;
echo 'requestedResource: ' . $requestedResource;
echo 'requestedFile: ' . $requestedFile;

if (empty($tenant)) {
    http_response_code(404);
    die();
}

//if ($requestedResource == 'templateInfo'){
//    $tenantFolder = './aabbccdd/templates';
//} else {
//    $tenantFolder = './aabbccdd/' . $requestedResource;
//}

if ($requestedResource == 'templateInfo'){
    $tenantFolder = '/home/noxorg/public_ftp/incoming/' . $tenant . '/templates';
} else {
    $tenantFolder = '/home/noxorg/public_ftp/incoming/' . $tenant . '/' . $requestedResource;
}

echo 'tenantFolder: ' . $tenantFolder;
die;

if (!is_dir($tenantFolder)) {
    http_response_code(403);
    die();
}

header('Content-Type: text/x-yaml');

switch ($requestedResource) {
    case "scripts":
        if (empty($requestedFile)) {
            returnScriptIndex($tenantFolder);
        } else {
            returnFileResponse($tenantFolder, $requestedFile);
        }
        break;
    case "templates":
        if (empty($requestedFile)){
            returnTemplateIndex($tenantFolder);
        } else {
            returnFileResponse($tenantFolder, $requestedFile);
        }
        break;
    case "templateInfo":
        if (empty($requestedFile)) {
            http_response_code(404);
            die();
        }
        returnTemplateInfo($tenantFolder, $requestedFile);
        break;
}

function returnFileResponse($tenantFolder, $requestedFile): void {
    $requestedFilePath = $tenantFolder.'/'.urldecode($requestedFile);

    if (!file_exists($requestedFilePath)) {
        http_response_code(405);
        die();
    }
    ob_clean();
    header('Content-Type: text/x-yaml');
    echo file_get_contents($requestedFilePath);
}

function returnScriptIndex($tenantDirectory): void
{
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
        $file_data[] = [
            'name' => basename($file),
            'size' => $size,
            'shaChecksum' => $shaChecksum
        ];
    }

    // Convert the file data to JSON and output it
    header('Content-Type: application/json');
    echo json_encode($file_data);
  
}

function returnTemplateIndex($tenantDirectory): void {
    $file_data = [];
    $templateList = scanAllDir($tenantDirectory);
    foreach($templateList as $template) {
        $filePath = $tenantDirectory . '/' . $template;
        $size = filesize($filePath);
        $shaChecksum = hash_file('sha256', $filePath);
        $file_data[] = [
            'name' => $template,
            'size' => $size,
            'shaChecksum' => $shaChecksum
        ];
    }

    // Convert the file data to JSON and output it
    header('Content-Type: application/json');
    echo json_encode($file_data);
}

function returnTemplateInfo($tenantDirectory, $requestedFile): void {
    $filePath = urldecode($requestedFile);
    $file = $tenantDirectory . '/' . $filePath;
    $size = filesize($file);

    // Get the SHA checksum of the file
    $shaChecksum = hash_file('sha256', $file);

    // Add the file data to the array
    $file_data = [
        'name' => $filePath,
        'size' => $size,
        'shaChecksum' => $shaChecksum
    ];

    // Convert the file data to JSON and output it
    header('Content-Type: application/json');
    echo json_encode($file_data);
}

function scanAllDir($dir): array
{
    $result = [];
    foreach(scandir($dir) as $filename) {
        if ($filename[0] === '.') continue;
        $filePath = $dir . '/' . $filename;
        if (is_dir($filePath)) {
            foreach (scanAllDir($filePath) as $childFilename) {
                $result[] = $filename . '/' . $childFilename;
            }
        } else {
            $result[] = $filename;
        }
    }
    return $result;
}

?>
