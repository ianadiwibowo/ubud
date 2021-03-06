// jQuery, for everything
window.$ = window.jQuery = require('jquery');
// Moustrap, for keyboard shortcuts not covered in the app menu
const mousetrap = require('mousetrap');
// Module to deal with filesystem
const fs = require('fs');
// Module to connect main.js and editor.js
const {ipcRenderer} = require('electron');
// Fountain.js, for parsing fountain format
fountain = require('./lib/fountain.js');

// Editor Text Type shortcuts 'Cmd/Ctrl+1' to 'Cmd/Ctrl+7'
mousetrap.bind(['command+1', 'ctrl+1'], function onCmdOrCtrl1Pressed() {
  $('#editor-text-type option')
    .removeAttr('selected')
    .filter('[value=1]')
    .attr('selected', true);
});
mousetrap.bind(['command+2', 'ctrl+2'], function onCmdOrCtrl2Pressed() {
  $('#editor-text-type option')
    .removeAttr('selected')
    .filter('[value=2]')
    .attr('selected', true);
});
mousetrap.bind(['command+3', 'ctrl+3'], function onCmdOrCtrl3Pressed() {
  $('#editor-text-type option')
    .removeAttr('selected')
    .filter('[value=3]')
    .attr('selected', true);
});
mousetrap.bind(['command+4', 'ctrl+4'], function onCmdOrCtrl4Pressed() {
  $('#editor-text-type option')
    .removeAttr('selected')
    .filter('[value=4]')
    .attr('selected', true);
});
mousetrap.bind(['command+5', 'ctrl+5'], function onCmdOrCtrl5Pressed() {
  $('#editor-text-type option')
    .removeAttr('selected')
    .filter('[value=5]')
    .attr('selected', true);
});
mousetrap.bind(['command+6', 'ctrl+6'], function onCmdOrCtrl6Pressed() {
  $('#editor-text-type option')
    .removeAttr('selected')
    .filter('[value=6]')
    .attr('selected', true);
});
mousetrap.bind(['command+7', 'ctrl+7'], function onCmdOrCtrl7Pressed() {
  $('#editor-text-type option')
    .removeAttr('selected')
    .filter('[value=7]')
    .attr('selected', true);
});

// Underline shortcut 'Cmd/Ctrl+U'
mousetrap.bind(['command+u', 'ctrl+u'], function onCmdOrCtrlUPressed() {
  document.execCommand('underline', false, '');
});

// Button editor-button-bold onclick event
$('#editor-button-bold').click(function onButtonBoldClick() {
  document.execCommand('bold', false, '');
});

// Button editor-button-italic onclick event
$('#editor-button-italic').click(function onButtonItalicClick() {
  document.execCommand('italic', false, '');
});

// Button editor-button-underline onclick event
$('#editor-button-underline').click(function onButtonUnderlineClick() {
  document.execCommand('underline', false, '');
});

// Load initial file
fs.readFile('./samples/brick&steel.fountain', function onRead(err, data) {
  fountain.parse(data.toString(), function(screenplay) {
    $('#editor-div').html(screenplay.html.script);
  });
});

// Save file
ipcRenderer.on('save', (event, arg) => {
  var text = $('#editor-div').html().trim();

  // START reverse-fountain.js
  // Scene Heading
  text = text.replace(/<h3>/g, '');
  text = text.replace(/<\/h3>/g, '\n');
  // Action (& Dialog)
  text = text.replace(/<p>/g, '');
  text = text.replace(/<\/p>/g, '\n');
  // Character
  text = text.replace(/<h4>/g, '');
  text = text.replace(/<\/h4>/g, '');
  // Parentheses

  // Dialog
  text = text.replace(/<div class="dialogue">\n/g, '');
  text = text.replace(/<\/div>\n/g, '');

  // Transition
  text = text.replace(/<h2>/g, '');
  text = text.replace(/<\/h2>/g, '\n');

  // END reverse-fountain.js

  fs.writeFile('./saved-tes-file.ubud', text, function onSuccess(err) {
    if(err)
      return console.log(err); // DEBUG

    alert('File \"saved-tes-file.ubud\" is saved.'); // DEBUG
    fs.close();
  });
});
