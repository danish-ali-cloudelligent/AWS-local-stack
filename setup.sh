#!/bin/bash
set -e

echo "Waiting 10s for LocalStack to fully start..."
sleep 10

# -------------------
# Package Lambda
# -------------------
cd lambda
npm install
zip -r lambda.zip .
cd ..

# -------------------
# Create IAM Role (dummy)
# -------------------
awslocal iam create-role --role-name lambda-ex \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

# -------------------
# Deploy Lambda
# -------------------
awslocal lambda create-function \
  --function-name myLambda \
  --runtime nodejs18.x \
  --handler index.handler \
  --zip-file fileb://lambda/lambda.zip \
  --role arn:aws:iam::000000000000:role/lambda-ex

# -------------------
# Create AppSync API
# -------------------
API_ID=$(awslocal appsync create-graphql-api \
  --name MyAPI \
  --authentication-type API_KEY \
  --query 'graphqlApi.apiId' --output text)

API_KEY=$(awslocal appsync create-api-key \
  --api-id $API_ID \
  --query 'apiKey.id' --output text)

echo "AppSync API ID: $API_ID"
echo "API Key: $API_KEY"

# -------------------
# Create Lambda datasource
# -------------------
awslocal appsync create-data-source \
  --api-id $API_ID \
  --name LambdaDS \
  --type AWS_LAMBDA \
  --lambda-config "functionArn=arn:aws:lambda:us-east-1:000000000000:function:myLambda" \
  --service-role-arn arn:aws:iam::000000000000:role/lambda-ex

# -------------------
# Create simple resolver
# -------------------
awslocal appsync create-resolver \
  --api-id $API_ID \
  --type-name Query \
  --field-name hello \
  --data-source-name LambdaDS

echo "Setup complete! You can now query your AppSync API."
