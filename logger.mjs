import EventEmitter from 'events'
const logger = new EventEmitter();

const pick_color = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn:  "\x1b[33m",
    Update_Request: "\x1b[40m",
}

logger.on('log', ({ level, message }) => {
    const timestamp = new Date()
    console.log(`${pick_color[level]}%s\x1b[0m`, `[${level}] ${message} - ${timestamp}`);
});

logger.info = function (message) {
    this.emit('log', { level: "info", message });
};

logger.update = function() {
    this.emit('log', { level: "Update_Request", message: "triggering special update message log"})
}

logger.warn = function (message) {
    this.emit('log', { level: "warn", message });
};

logger.error = function(message) {
    this.emit('log', { level: "error", message})
}

export function logAuthenticationSuccess(user) {
    logger.emit('log', { level: "info", message: `User ${user.email} successfully logged in` });
}

export function logAuthorizationSuccess(user) {
    logger.emit('log', { level: "info", message: `User ${user.userId} is Authorize.`});
}

export function logAuthenticationFailure(user, reason) {
    logger.emit('log', { level: "warn", message: `User ${user.email} failed to log in (${reason})`});
}

export default logger;