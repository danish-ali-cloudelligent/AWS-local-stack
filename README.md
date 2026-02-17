# LocalStack AWS Development Environment

Local AWS development environment using LocalStack with AppSync, Lambda, and PostgreSQL.

## Services

- **LocalStack**: AWS Lambda, AppSync, IAM
- **PostgreSQL**: Database (port 5432)
- **Lambda**: Node.js function connecting to Postgres
- **AppSync**: GraphQL API

## Prerequisites

- Docker & Docker Compose
- AWS CLI with `awslocal` wrapper
- Node.js & npm

## Setup

1. Start services:
```bash
docker-compose up -d
```

2. Run setup script:
```bash
./setup.sh
```

This will:
- Package and deploy the Lambda function
- Create IAM role
- Create AppSync API with API key
- Configure Lambda data source and resolver

## Lambda Function

Located in `lambda/index.js`. Connects to PostgreSQL and returns current timestamp.

**Dependencies**: `pg` (PostgreSQL client)

## GraphQL Schema

Schema defined in `graphql/schema.graphql` with Book and Movie types.

## Configuration

- LocalStack endpoint: `http://localhost:4566`
- PostgreSQL: `localhost:5432`
  - User: `dev`
  - Password: `secret`
  - Database: `mydb`

## Usage

After setup, query AppSync API using the generated API ID and key (displayed in setup output).
