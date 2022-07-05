import connection from "./../database.js";

async function selectUserByEmail(email) {
  const query = `
        SELECT * 
        FROM users
        WHERE email = $1
    `;

  const values = [email];
  return connection.query(query, values);
}

async function insertUser(name, email, hashedPassword) {
  const query = `
    INSERT INTO "users" ("name", "email", "password")
    VALUES ($1, $2, $3)`;

  const values = [name, email, hashedPassword];
  return connection.query(query, values);
}

export const usersRepository = {
  selectUserByEmail,
  insertUser,
};
