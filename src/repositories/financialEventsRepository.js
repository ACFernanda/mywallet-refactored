import connection from "./../database.js";

async function insertFinancialEvent(userId, value, type) {
  const query = `
    INSERT INTO "financialEvents" ("userId", "value", "type")
    VALUES ($1, $2, $3)`;

  const values = [userId, value, type];
  return connection.query(query, values);
}

async function selectFinancialEventsById(userId) {
  const query = `
    SELECT * FROM "financialEvents"
    WHERE "userId"=$1
    ORDER BY "id" DESC`;

  const values = [userId];
  return connection.query(query, values);
}

export const financialEventsRepository = {
  insertFinancialEvent,
  selectFinancialEventsById,
};
