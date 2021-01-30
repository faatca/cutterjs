axios = require("axios");
path = require("path");
fs = require("fs");
util = require("util");

async function connect() {
  const connectionPath = path.join(
    process.env.LOCALAPPDATA,
    "cutter",
    "connection.json"
  );
  const content = await util.promisify(fs.readFile)(connectionPath);
  const params = JSON.parse(content);
  const api = axios.create({
    baseURL: `http://localhost:${params.port}`,
    headers: {
      common: {
        authorization: `Bearer ${params.secret}`,
      },
    },
  });
  return new Cutter(api);
}

class Cutter {
  constructor(api) {
    this.api = api;
  }

  async getStatus() {
    const result = await this.api.get("/app/status");
    return result.data;
  }

  async close() {
    const result = await this.api.post("/app/close");
    return result.data;
  }

  async getControlsList() {
    const result = await this.api.post("/controls/list");
    return result.data;
  }

  async fillControl(pattern, value) {
    const result = await this.api.post("/controls/fill", { pattern, value });
    return result.data;
  }

  async clickControl(pattern) {
    const result = await this.api.post("/controls/click", { pattern });
    return result.data;
  }

  async signIn(username, password) {
    const result = await this.api.post("/auth/sign-in", { username, password });
    return result.data;
  }

  async signOut() {
    const result = await this.api.post("/auth/sign-out");
    return result.data;
  }

  async startOfficeStatus() {
    const result = await this.api.post("/pages/office-status/start");
    return result.data;
  }

  async changeOfficeStatusDate(date) {
    const result = await this.api.post("/pages/office-status/change-date", {
      date,
    });
    return result.data;
  }

  async startPatientCheckIn() {
    const result = await this.api.post("/pages/check-in/start");
    return result.data;
  }

  async startFindChart() {
    const result = await this.api.post("/pages/find-chart/start");
    return result.data;
  }
}

exports.connect = connect
