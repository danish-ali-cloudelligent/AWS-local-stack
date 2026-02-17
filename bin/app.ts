#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LocalStackStack } from '../lib/localstack-stack';

const app = new cdk.App();
new LocalStackStack(app, 'LocalStackStack', {
  env: { account: '000000000000', region: 'us-east-1' }
});
