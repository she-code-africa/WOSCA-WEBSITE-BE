import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, label, simple,
} = format;

const logger = createLogger({
  format: combine(
    label({ label: 'LOGGING', message: true }),
    timestamp(),
    simple(),
  ),
  transports: [new transports.Console()],
});

export default logger;
