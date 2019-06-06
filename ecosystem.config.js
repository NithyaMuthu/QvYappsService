module.exports = {
    apps: [{
        name: 'quickview',
        script: './index.js'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-34-203-219-158.compute-1.amazonaws.com',
            key: '~/.ssh/quickviewawsinstance.pem',
            ref: 'origin/master',
            repo: 'git@github.com:NithyaMuthu/QvYappsService.git',
            path: '/home/ubuntu/QvYappsService',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
};
