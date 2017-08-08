// jQuery
window.$ = window.jQuery = require('jquery');
// Module to register keyboard shortcuts
const mousetrap = require('mousetrap');
// Module to deal with filesystem
const fs = require('fs');

// Register 'Cmd+S' and 'Ctrl+S' shortcuts listener to save file
mousetrap.bind(['command+s', 'ctrl+s'], function onShortcutPressed() {
  var text = $('#editor-div').html().trim();

  fs.writeFile('./saved-tes-file.ubud', text, function onSuccess(err) {
    if(err)
      return console.log(err); // DEBUG

    alert('File \"saved-tes-file.ubud\" saved.'); // DEBUG
    fs.close();
  });
});
