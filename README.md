# LocalStack AWS Development Environment with CDK

Local AWS development environment using AWS CDK with LocalStack, Lambda, and PostgreSQL.

## Services

- **LocalStack**: AWS Lambda, IAM
- **PostgreSQL**: Database (port 5432)
- **Lambda**: Node.js function connecting to Postgres
- **AWS CDK**: Infrastructure as Code

## Prerequisites

- Docker & Docker Compose
- Node.js & npm
- AWS CDK CLI (`npm install -g aws-cdk`)
- CDK Local wrapper (`npm install -g aws-cdk-local`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start LocalStack:
```bash
docker-compose up -d
```

3. Deploy with CDK:
```bash
./deploy.sh
```

Or manually:
```bash
npm run deploy
```

## Project Structure

```
├── bin/
│   └── app.ts           # CDK app entry point
├── lib/
│   └── localstack-stack.ts  # CDK stack definition
├── lambda/
│   └── index.js         # Lambda function code
├── cdk.json             # CDK configuration
└── docker-compose.yml   # LocalStack & Postgres
```

## CDK Commands

- `npm run synth` - Synthesize CloudFormation template
- `npm run deploy` - Deploy stack to LocalStack
- `npm run destroy` - Destroy stack

## Configuration

- LocalStack endpoint: `http://localhost:4566`
- PostgreSQL: `localhost:5432`
  - User: `dev`
  - Password: `secret`
  - Database: `mydb`

## Usage

After deployment, check the CDK outputs for Lambda ARN and name. Invoke the Lambda function:

```bash
awslocal lambda invoke --function-name myLambda output.json
cat output.json
```
