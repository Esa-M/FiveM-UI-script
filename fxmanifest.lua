fx_version 'cerulean'
game 'gta5'

name "b4_progressbar"
description "Progress Bar"
author "Dark Knight"
version "0.0.1"

shared_scripts {
	'shared/*.lua'
}

client_scripts {
	'client/*.lua'
}

server_scripts {
	'server/*.lua'
}

ui_page 'nui/index.html'

files {
    'nui/index.html',
    'nui/index.css',
    'nui/index.js',
    'nui/assets/color-picker.svg',
    'nui/assets/paint.svg',
    'nui/fonts/Forestion-Aged.otf',
    'nui/fonts/Forestion-Aged.ttf'
}
