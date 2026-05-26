import * as Sentry from '@sentry/react';

const enabledValue = String(import.meta.env.VITE_SENTRY_ENABLED ?? '').toLowerCase();
const enabled = enabledValue === 'true' || enabledValue === '1' || enabledValue === 'yes';
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
