# Gympass Style App

## RFs (Functional Requirements)
- [X] It must be possible to register;
- [X] It must be possible to authenticate;
- [X] It must be possible to retrieve the profile of a logged-in user;
- [X] It must be possible to get the number of check-ins performed by the logged-in user;
- [X] It must be possible for the user to access their check-in history;
- [X] It must be possible for the user to search for nearby gyms (10km);
- [X] It must be possible for the user to search for gyms by name;
- [X] It must be possible for the user to check in at a gym;
- [X] It must be possible to validate a user's check-in;
- [X] It must be possible to register a gym;

## RNs (Business Rules)
- [X] User must not be able to register with a duplicate email;
- [X] User cannot perform more than one check-in on the same day;
- [X] User cannot check in unless they are within 100 meters of the gym;
- [X] Check-in can only be validated up to 20 minutes after it is created;
- [X] Check-in can only be validated by administrators;
- [X] A gym can only be registered by administrators;

## RNFs (Non-Functional Requirements)
- [X] User passwords must be encrypted;
- [X] Application data must be persisted in a PostgreSQL database;
- [X] All data lists must be paginated with 20 items per page;
- [X] Users must be identified by a JWT (JSON Web Token);

## Dependencies

### Dev Dependencies

- @types/node
- tsup
- tsx
- typescript
- prisma
- @types/bcryptjs
- vitest
- vite-tsconfig-paths
- @vitest/coverage-v8
- supertest
- @types/supertest

### Prod Dependencies

- Fastify
- dotenv
- zod
- @prisma/client
- bcryptjs
- dayjs
- @fastify/cookie
