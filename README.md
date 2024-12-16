# Gympass Style App

## RFs (Functional Requirements)
- [ ] It must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to retrieve the profile of a logged-in user;
- [ ] It must be possible to get the number of check-ins performed by the logged-in user;
- [ ] It must be possible for the user to access their check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check in at a gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym;

## RNs (Business Rules)
- [ ] User must not be able to register with a duplicate email;
- [ ] User cannot perform more than one check-in on the same day;
- [ ] User cannot check in unless they are within 100 meters of the gym;
- [ ] Check-in can only be validated up to 20 minutes after it is created;
- [ ] Check-in can only be validated by administrators;
- [ ] A gym can only be registered by administrators;

## RNFs (Non-Functional Requirements)
- [ ] User passwords must be encrypted;
- [ ] Application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] Users must be identified by a JWT (JSON Web Token);

## Depencies

# Dev Dependencies

- @types/node
- tsup
- tsx
- typescript

# Prod Dependencies

- Fastify