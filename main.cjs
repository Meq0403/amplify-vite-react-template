#!/usr/bin/env node
const cdk = require('aws-cdk-lib'); // CommonJS import
const { MyStack } = require('./my-stack.cjs'); // Import from CommonJS

// Initialize the CDK app
const app = new cdk.App();

// Add a stack to the app
new MyStack(app, 'MyStack', {
  // Optional stack properties
});
