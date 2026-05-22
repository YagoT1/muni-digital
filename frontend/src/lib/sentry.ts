import * as Sentry from '@sentry/react';

const enabled = import.meta.env.VITE_SENTRY_ENABLED === 'true';
const dsn = import.meta.env.VITE_SENTRY_DSN;
const environment =
  import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development';

if (enabled && dsn) {
  Sentry.init({
    dsn,
    environment,
    tracesSampleRate: 0.1,
  });
}