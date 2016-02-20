
function handle_error() {
  console.log('error');
}

/*
the string of body receive by AJAX call : 
Sat Feb 20 06:59:50 UTC 2016
 vlan1:1017893183  805165    0    0    0     0          0         0 76422523  622390    0    0    0     0       0          0
*/
var Parse = {
  getData : function(body) {
    if (!body) return handle_error();  // getURL get empty data, IE problem

    // split the two lines
    var lines=body.split("\n");
    var dateStr=lines[0];

    //fake timezone cause the real value might confuse JS
    dateStr=dateStr.replace(/ [A-Z]+ /, ' GMT '); 
    var ugmt=(Date.parse(dateStr))/1000;

    // split by word or by :
    data=lines[1].split(/\s+|:/);

    // if the begening of the split is not integer, shift the array
    while (data[0]!=parseInt(data[0])) {
      data.shift();
      // if no data to parse return nothing
      if (0==data.length) return;
    }

    return {
      ifin: parseInt(data[0]),
      ifout : parseInt(data[8]),
      ugmt: ugmt
    };
  }
}

module.exports = Parse;