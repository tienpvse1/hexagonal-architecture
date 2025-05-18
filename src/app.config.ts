export type AppConfig = {
  enableRestAPI: boolean;
  dbClient: 'typeorm' | 'kysely';
};
