# LocalStack AWS Development Environment with CDK

Local AWS development environment using AWS CDK with LocalStack, Lambda, and PostgreSQL.

## Services

- **LocalStack**: AWS Lambda, IAM, SSM, CloudFormation, S3
- **PostgreSQL**: Database (port 5432)
- **Lambda**: Node.js function connecting to Postgres
- **AWS CDK**: Infrastructure as Code

## Prerequisites

- Docker & Docker Compose
- Node.js & npm
- AWS CDK CLI (`npm install -g aws-cdk`)
- CDK Local wrapper (`npm install -g aws-cdk-local`)
- AWS CLI Local (`pip install awscli-local`)

## Setup

1. Install dependencies:
```bash
npm install
cd lambda && npm install && cd ..
```

2. Start LocalStack and PostgreSQL:
```bash
docker-compose up -d
```

3. Bootstrap CDK (first time only):
```bash
cdklocal bootstrap
```

4. Deploy stack:
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
├── tsconfig.json        # TypeScript configuration
├── docker-compose.yml   # LocalStack & Postgres
└── deploy.sh            # Deployment script
```

## CDK Commands

- `npm run synth` - Synthesize CloudFormation template
- `npm run deploy` - Deploy stack to LocalStack
- `npm run destroy` - Destroy stack
- `cdklocal bootstrap` - Bootstrap CDK environment (first time)

## Configuration

- LocalStack endpoint: `http://localhost:4566`
- PostgreSQL: `localhost:5432`
  - User: `dev`
  - Password: `secret`
  - Database: `mydb`

## Testing Lambda

After deployment, invoke the Lambda function:

```bash
awslocal lambda invoke --function-name myLambda output.json
cat output.json
```

Expected output:
```json
{
  "statusCode": 200,
  "body": "{\"message\":\"Hello from Lambda + Postgres!\",\"time\":\"2024-01-01T12:00:00.000Z\"}"
}
```

## Cleanup

```bash
npm run destroy
docker-compose down
```
