#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'; // Use import instead of require
import { MyStack } from '../lib/my-stack.js'; // Add .js extension for ES modules

// Initialize the CDK app
const app = new cdk.App();

// Add a stack to the app
new MyStack(app, 'MyStack', {
  // Optional stack properties
});
