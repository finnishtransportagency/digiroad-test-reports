const Ajv = require('ajv');
const fs = require('fs');
const path = require('path'); 


  
// Use content body as data
// const data = res.body;


const common_schema_test_for_response_data_and_schema = (data, schema) => {

  test(`Schema is correct`, async () => {
    const ajv = new Ajv();

    let validationResult = false;
    
    try {
      validationResult = ajv.validate(schema, data);
      if (!validationResult) {
        console.error('Schema errors:', ajv.errors);
      }
    } 
    catch (error) {
      console.error("Error caught: " + error.message);
    } 
    finally {
      // console.log("This will always execute.");
    }
    
    expect(validationResult).to.be.true; 

  });

}

const common_schema_test_for_all = (data, path_schema, file_schema) => {
  
  console.log(`!!! BEGIN: "${path.basename(__filename)}" !!!`);
  
  test(`Schema is correct`, async () => {
    
    const ajv = new Ajv();

    const path_and_file_schema = path.join(__dirname, '../../', path_schema, file_schema);
    const schema = JSON.parse(fs.readFileSync(path_and_file_schema, 'utf8'));
    console.log(`${path.basename(__filename)}: __dirname:  ${__dirname}`);
    console.log(`${path.basename(__filename)}: Schema file path:  ${path_and_file_schema}`);
    
    let validationResult = false;
    
    try {
      validationResult = ajv.validate(schema, data);
      if (!validationResult) {
        console.error('Schema errors:', ajv.errors);
      }
    } 
    catch (error) {
      console.error("Error caught: " + error.message);
    } 
    finally {
      // console.log("This will always execute.");
    }
    
    expect(validationResult).to.be.true; 
    
  });

  console.log(`!!! END: "${path.basename(__filename)}" !!!`);

}

const common_schema_test_for_response_test_data_json_file_and_schema_js_file = (data, path_schema, file_schema) => {
  common_schema_test_for_all(data, path_schema, file_schema); 
}

const common_schema_test_for_response_test_data_json_file_and_schema_json_file = (data, path_schema, file_schema) => {
  common_schema_test_for_all(data, path_schema, file_schema); 
}

const common_schema_test_for_response_data_and_schema_js_file = (data, path_schema, file_schema) => {
  const path_and_file_schema = path.join(__dirname, '../../', path_schema, file_schema);
  // const schema = JSON.parse(fs.readFileSync(path_and_file_schema, 'utf8'));
  const SCHEMA = require(path_and_file_schema);
  return common_schema_test_for_response_data_and_schema(data, SCHEMA); 
}

const common_schema_test_for_response_data_and_schema_json_file = (data, path_schema, file_schema) => {
  common_schema_test_for_all(data, path_schema, file_schema); 
}

const common_schema_test_for_response = (data, path_schema, file_schema) => {
  common_schema_test_for_all(data, path_schema, file_schema); 
}

const common_schema_test_for_file = (path_test_data, file_test_data, path_schema, file_schema) => {
  const path_and_file_test_data = path.join(__dirname, '../../', path_test_data, file_test_data);
  const data = JSON.parse(fs.readFileSync(path_and_file_test_data, 'utf8')); 
  return common_schema_test_for_all(data, path_schema, file_schema); 
}

const parse_data_from_file = (path_test_data, file_test_data) => {
  const path_and_file_test_data = path.join(__dirname, '../../', path_test_data, file_test_data);
  const data = JSON.parse(fs.readFileSync(path_and_file_test_data, 'utf8'));
  return data; 
}

const parse_test_data_from_json_file = (path_test_data, file_test_data) => {
  return parse_data_from_file(path_test_data, file_test_data);
}

module.exports = {
  common_schema_test_for_all, 
  common_schema_test_for_file, 
  common_schema_test_for_response, 
  common_schema_test_for_response_data_and_schema_js_file, 
  parse_data_from_file,
  parse_test_data_from_json_file
}



