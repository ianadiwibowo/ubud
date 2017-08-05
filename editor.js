// Module to register keyboard shortcuts
const mousetrap = require('mousetrap');

// Register 'Cmd+S' and 'Ctrl+S' shortcuts listener to save file
mousetrap.bind(['command+s', 'ctrl+s'], function onBind() {
  alert('Cmd+S is pressed'); // DEBUG
});
