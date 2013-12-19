<?php
class Background {
    public function __construct() {

    }
    public function before_read_file_meta(&$headers)
    {
        $headers['background'] = 'Background';
    }
}
?>