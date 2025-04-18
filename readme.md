<h1 align="center">
  Encore Transfer
</h1>

<div align="center">
  Encore Transfer - Service for transferring output from encore job with a transfer job in OSC. 
  <br />
  <br />
  :book: <b><a href="https://github.com/Eyevinn/osaas/wiki">Read the documentation</a></b> :eyes:
  <br />
</div>

<div align="center">
<br />

[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/eyevinn/encore-transfer/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![made with hearth by Eyevinn](https://img.shields.io/badge/made%20with%20%E2%99%A5%20by-Eyevinn-59cbe8.svg?style=flat-square)](https://github.com/eyevinn)
[![Slack](http://slack.streamingtech.se/badge.svg)](http://slack.streamingtech.se)

[![Badge OSC](https://img.shields.io/badge/Evaluate-24243B?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8yODIxXzMxNjcyKSIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI3IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz4KPGRlZnM%2BCjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8yODIxXzMxNjcyIiB4MT0iMTIiIHkxPSIwIiB4Mj0iMTIiIHkyPSIyNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjQzE4M0ZGIi8%2BCjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzREQzlGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM%2BCjwvc3ZnPgo%3D)](https://app.osaas.io/browse/eyevinn-encore-transfer)

</div>

This service can be part of a video processing pipeline in Open Source Cloud.

[![pipeline](./encore_transfer.png)](https://www.osaas.io)

## Requirements

- Account on [Open Source Cloud](https://app.osaas.io)

## Installation / Usage

### Environment Variables

| Variable                       | Description                                                                                      | Default value            |
| ------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------ |
| `REDIS_URL`                    | URL to the redis server                                                                          | `redis://localhost:6379` |
| `REDIS_QUEUE`                  | Name of the redis queue to listen to                                                             | `transfer-queue`         |
| `PORT`                         | Port to bind and listen to                                                                       | `8000`                   |
| `S3_OUTPUT`                    | S3 bucket and base folder for output, actual output will be in a subfolder named from the job id |                          |
| `OSC_ACCESS_TOKEN`             | OSC access token for accessing Encore instance in OSC                                            |                          |
| `AWS_ACCESS_KEY_ID_SECRET`     | OSC secret containing AWS access key id for `S3_OUTPUT`                                          |                          |
| `AWS_SECRET_ACCESS_KEY_SECRET` | OSC secret containing AWS secret access for `S3_OUTPUT`                                          |                          |

## Development

```bash
% npm install
```

Setup necessary environment variables

```bash
% export OSC_ACCESS_TOKEN=<personal-access-token>
% export AWS_ACCESS_KEY_ID_SECRET=awsaccesskeyid
% export AWS_SECRET_ACCESS_KEY_SECRET=awssecretaccesskey
```

Start service

```bash
% DEBUG=1 \
  S3_OUTPUT=s3://lab-testcontent-store/birme/encore/ \
  REDIS_URL=redis://<ip>:<port> npm start
```

To avoid accidentially commiting API secrets we encourage strongly not to use `.env` files or similar. Use the in-built functionality in the terminal for these purposes by sourcing env variables from files stored in your home directory outside of the repo.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md)

## License

This project is licensed under the MIT License, see [LICENSE](LICENSE).

# Support

Join our [community on Slack](http://slack.streamingtech.se) where you can post any questions regarding any of our open source projects. Eyevinn's consulting business can also offer you:

- Further development of this component
- Customization and integration of this component into your platform
- Support and maintenance agreement

Contact [sales@eyevinn.se](mailto:sales@eyevinn.se) if you are interested.

# About Eyevinn Technology

[Eyevinn Technology](https://www.eyevinntechnology.se) is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor. As our way to innovate and push the industry forward we develop proof-of-concepts and tools. The things we learn and the code we write we share with the industry in [blogs](https://dev.to/video) and by open sourcing the code we have written.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
