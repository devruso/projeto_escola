const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Api escolar com CRUD de alunos, professores e turmas",
        version: "1.0.0",
        description:
          "UMA API TOPP",
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  module.exports = options;