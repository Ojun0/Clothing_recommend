const tinycolor = require('tinycolor2');


function colorToHex(hex){
    let translateColor = tinycolor(hex);
    // console.log(translateColor.toHexString());
    return translateColor;
}

module.exports = {colorToHex};