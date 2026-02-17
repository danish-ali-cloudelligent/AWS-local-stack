const { Client } = require("pg");

// Lambda handler
exports.handler = async (event) => {
  const client = new Client({
    host: "host.docker.internal", // points to Mac host from Docker container
    port: 5432,
    user: "dev",
    password: "secret",
    database: "mydb",
  });

  await client.connect();

  const res = await client.query("SELECT NOW() AS current_time");
  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda + Postgres!",
      time: res.rows[0].current_time,
    }),
  };
};

// exports.handler = async (event) => {
//     console.log("Event:", JSON.stringify(event));

//     if (event.fieldName === "ListBooks") {
//         return [
//             { id: "1", title: "The Hobbit", author: "J.R.R. Tolkien" },
//             { id: "2", title: "1984", author: "George Orwell" }
//         ];
//     }

//     if (event.fieldName === "ListMovies") {
//         return [
//             { id: "1", title: "Inception", director: "Christopher Nolan" },
//             { id: "2", title: "The Matrix", director: "The Wachowskis" }
//         ];
//     }

//     return null;
// };

