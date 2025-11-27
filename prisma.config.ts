import {defineConfig, env} from "prisma/config"

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        //url: env("DATABASE_URL"),
        url: "mysql://root:root@localhost:3306/moneybook",
    },
})
