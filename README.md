# Streamdata.io Stock Market Prices Streaming Demo API (Serverless)
This is a basic demo of delivering a Server-Sent Events (SSE) stream of stock market prices using Streamdata.io, that runs on AWS Lambda. It is meant to take any existing JSON API, in this case a demo stock market API, and turn it into a streaming API using Server-Sent Events (SSE), and applying incremental updates using JSON Patch.

You will need a Streamdata.io account + key to run this function, as well as an AWS account the Lambda function in. You can run this as stream for up to five minutes (the maximum timeout of a Lambda script), then rerun every five minutes using AWS Cloudwatch Events. There is no destination for the resulting data stream, it is just meant to demonstrate what is possible with a serverless stream. Visit Streamdata.io for more information on our service, and submit an issue on the Github repository for this project if you need help with this specific serverless package.

URL: http://streamdata.io

License: [MIT License](https://github.com/streamdata-serverless/streamdata-io-basic-demo-stockmarket-prices/blob/master/LICENSE)
