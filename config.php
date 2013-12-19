<?php 


// Override any of the default settings below:

$config['site_title'] = 'Michael Bickley';			// Site title
$config['base_url'] = 'http://michaelbickley.com'; 				// Override base URL (e.g. http://example.com)
$config['theme'] = 'default'; 			// Set the theme (defaults to "default")
$config['date_format'] = 'jS M Y';		// Set the PHP date format
$config['twig_config'] = array(			// Twig settings
	'cache' => false,					// To enable Twig caching change this to CACHE_DIR
	'autoescape' => false,				// Autoescape Twig vars
	'debug' => false					// Enable Twig debug
);
$config['pages_order_by'] = 'date';	    // Order pages by "alpha" or "date"
$config['pages_order'] = 'desc';			// Order pages "asc" or "desc"
$config['excerpt_length'] = 200;		// The pages excerpt length (in words)
