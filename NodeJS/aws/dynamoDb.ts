import { config, DynamoDB, AWSError, DynamoDBStreams } from "aws-sdk";

config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const docClient = new DynamoDB.DocumentClient();

const queryDynamoDB = () => {
  docClient.query(
    {
      // Limit: 2000,
      TableName: TABLE_NAME,
      ExclusiveStartKey: LastEvaluatedKey || undefined,
      KeyConditionExpression:
        "VARIABLE1 = :pkey and #VARIABLE2 between :sdate AND :edate",
      ExpressionAttributeValues: {
        ":pkey": params.camera,
        ":sdate": params.startDate,
        ":edate": params.endDate,
      },
      ExpressionAttributeNames: {
        VARIABLE1: "COLUMN1 NAME IN TABLE",
        VARIABLE2: "COLUMN2 NAME IN TABLE",
      },
      // ProjectionExpression: "CN, SC, SSC, SDT, VC",
      ScanIndexForward: false,
    },
    (err: AWSError, data) => {}
  );
};

const addItemInDynamoDB = () => {
  docClient.put(
    {
      TableName: TABLE_NAME,
      Item,
    },
    (err: AWSError, data) => {}
  );
};

const deleteItemFromDynamoDB = () => {
  docClient.delete(
    {
      TableName: TABLE_NAME,
      Key: {
        keyField: keyValue,
      },
    },
    function (err: AWSError, data) {}
  );
};
