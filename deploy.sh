#!/bin/bash
set -e

echo "Waiting for LocalStack to start..."
sleep 10

echo "Deploying stack with CDK..."
npm run deploy

echo "Setup complete!"
