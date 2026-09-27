const axios = require("axios");
const { log } = require("../utils/logger");

// This service contains the gateway's main job: forward HTTP requests.
// The route file calls proxyRequest, then this file calls a downstream service.
async function proxyRequest(req, res, serviceUrl, targetPath) {
  const url = `${serviceUrl}${targetPath}`;

  log("Outgoing request", {
    method: req.method,
    url,
    body: req.body
  });

  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body
    });

    // The gateway returns the exact status code and data from the service.
    // After this response is sent, the request is finished.
    return res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const data = error.response
      ? error.response.data
      : { message: "Gateway could not reach the target service" };

    log("Proxy error", { status, data });
    return res.status(status).json(data);
  }
}

module.exports = { proxyRequest };
