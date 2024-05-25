module.exports = {
    API_PORT: process.env.APP_PORT || 8080,
    CORS_ORIGINS: process.env.CORS_ORIGINS || 'http://localhost:4200',
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'COOKIE_SECRET',

    getCorsOrigins: () => {
        return process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim());
    }
}