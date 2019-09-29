import { logger } from './logger'

const signals = {
    'SIGHUP': 1,
    'SIGINT': 2,
    'SIGTERM': 15
};

function handleShutdown(server, options = {}) {
    const { onShutdown } = options
    const shutdown = async (signal, value) => {
        await onShutdown()
        logger.info("shutdown ..");
        server.close(() => {
            logger.info(`server stopped by ${signal} with value ${value}`);
            process.exit(128 + value);
        });
    };

    Object.keys(signals).forEach((signal) => {
        process.on(signal, async () => {
            logger.info(`process received a ${signal} signal`);
            await shutdown(signal, signals[signal]);
        });
    });
}

export { handleShutdown }

