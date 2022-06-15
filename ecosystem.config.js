module.exports = {
    apps: [{
        name: 'Nodejs TypeScript API',
        script: 'dist/server.js',
        exec_mode: 'cluster',
        instances: 4,
        autorestart: true,
        watch: true,
        env_production: {
            NODE_ENV: 'production'
        }
    }],
};
