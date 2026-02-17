import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';

export class LocalStackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function
    const lambdaFn = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      functionName: 'myLambda'
    });

    // Outputs
    new cdk.CfnOutput(this, 'LambdaArn', { value: lambdaFn.functionArn });
    new cdk.CfnOutput(this, 'LambdaName', { value: lambdaFn.functionName });
  }
}
