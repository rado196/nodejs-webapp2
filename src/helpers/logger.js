class Logger {
  #job = null;

  constructor(job) {
    this.#job = job;
  }

  info(message) {
    return this.#printLog('INFO', message);
  }
  warning(message) {
    return this.#printLog('WARN', message);
  }
  error(message) {
    return this.#printLog('EROR', message);
  }
  fatal(message) {
    return this.#printLog('FATL', message);
  }

  async #printLog(level, message) {
    let logs = this.#job.getDataValue('logs') || '';
    logs += `[${level} - ${new Date().toISOString()}]: ${message}\n`;

    this.#job.setDataValue('logs', logs);
    await this.#job.save();
  }
}

module.exports.build = function (job) {
  return new Logger(job);
};
