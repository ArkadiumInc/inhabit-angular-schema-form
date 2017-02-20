var through = require('through-gulp');
var buffer  = require('buffer').Buffer;
 
// exporting the plugin  
module.exports = () => through(function(file, encoding, cb) {
    if (file.isBuffer()) {
        file.contents = Buffer.from(
            file.contents.toString().replace(/"dependencies"/g, '"peerDependencies"')
        );
    }
    this.push(file);
    cb();
});