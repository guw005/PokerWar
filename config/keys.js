// module.exports = {
//     mongoURI: "mongodb+srv://dev:DEIWml6szT5raCk6@cluster0.xqvav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// }
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
  } else {
    module.exports = require('./keys_dev');
  }