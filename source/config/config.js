const config = require('./config.json');

const env = process.env.NODE_ENV || "development";

console.log(`**** environment: ${env} ****`);

if (env === 'development' || env === 'test') {

    // fetch the appropriate object depending on the environment we are running.
    const envConfig = config[env];

    // loop through all the keys and set the values for the environment variables
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}
