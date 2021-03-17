const logger = require("../../logger");

`use strict`;

class Response {
  constructor(moduleId, hapiResponse) {
    this.moduleId = moduleId;
    this.hapiResToolkit = hapiResponse;    

    this.fail = (statusCode, msg/*, failedResult */) => {
      const response = this.hapiResToolkit.response('fail')
        .type('application/json')
        .code(Number(`${this.moduleId}${statusCode}`))
        .message(msg);
      //response.output.payload.failedResult = failedResult;
      return response;
    }

    this.success = (msg) => this.hapiResToolkit.response('success')
                              .type('application/json')
                              .code(Number(`${this.moduleId}200`))
                              .message(msg);
  }
}

module.exports = Response;