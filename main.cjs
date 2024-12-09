#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { MyStack } = require('./my-stack.cjs'); // Import the stack

// Initialize the CDK application
const app = new cdk.App();

// Define the stack with AWS account and region
new MyStack(app, 'MyStack', {
  env: {
    account: '688567303007', 
    region: 'us-east-2',  
  },
});
