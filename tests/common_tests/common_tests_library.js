const path = require('path'); 

const common_tests_library = () => {
  
  console.log(`!!! BEGIN: "${path.basename(__filename)}" !!!`);
  
  /*
  test(`Testing...`, async () => {
    // Insert code here...  
  });
  */

  console.log(`!!! END: "${path.basename(__filename)}" !!!`);

}


const status_equal = (status) => {
  test(`Status is ${status}`, async () => { 
    expect(res.status).to.equal(status);
  });
}

const status_text_is = (status_text) => {
  test(`Status text is ${status_text}`, async () => { 
    expect(res.statusText).to.equal(status_text);
  });
}

module.exports = {
  common_tests_library, 
  status_equal, 
  status_text_is
}



