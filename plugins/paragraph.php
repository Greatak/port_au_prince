<?php
class Paragraph{
    public function get_page_data(&$data, $page_meta){
        $tmp = explode("\n",$data['excerpt']);
        for($i=0; $i<count($tmp);++$i){
            if("." === "" || substr($tmp[$i], -strlen(".")) === "."){
                $data['excerpt'] = $tmp[$i];
            }
        }
    }
}
?>