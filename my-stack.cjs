const cdk = require('aws-cdk-lib');
const s3 = require('aws-cdk-lib/aws-s3');
const s3deploy = require('aws-cdk-lib/aws-s3-deployment');

class MyStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create an S3 bucket for hosting the React app
    const bucket = new s3.Bucket(this, 'ReactAppBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true, // Allow public read access
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }), // Fully disable public access blocking
    });

    // Deploy the React build output to the S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployReactApp', {
      sources: [s3deploy.Source.asset('./dist')], // Path to the generated build folder
      destinationBucket: bucket,
    });
    
  }
}

module.exports = { MyStack };
