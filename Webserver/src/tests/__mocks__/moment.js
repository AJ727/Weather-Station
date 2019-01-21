// THIS IS A MOCK LIBRARY, we need to do this because when moment is called in another file
// it creates it at the moment it is called, therefore when the tests are run, another instance is created
// causing them to never be the same, always resulting in an error

// You can't do "import moment" because it will call itself, 
// we need to use require to get the REAL moment, not this moment in this file
const moment = require.requireActual('moment');

export default(timestamp = 0) => {
    return moment(timestamp)
};