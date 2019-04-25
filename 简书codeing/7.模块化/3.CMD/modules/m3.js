define(function(require,exports,module){
    var msg = 'm3';
    function tle(){
        console.log(msg);
    }
    exports.tle = {
        tle: tle
    }
})