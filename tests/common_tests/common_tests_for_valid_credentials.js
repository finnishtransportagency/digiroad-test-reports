const path = require('path'); 
const { status_equal, status_text_is } = require('./common_tests_library.js');

const common_tests_for_valid_credentials = () => {
  
  // console.log(`!!! BEGIN: "${path.basename(__filename)}" !!!`);
  
  status_equal(200); 

  status_text_is('OK')

  // console.log(`!!! END: "${path.basename(__filename)}" !!!`);

}

module.exports = {
  common_tests_for_valid_credentials
}



