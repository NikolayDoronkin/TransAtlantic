export class LiquibaseConfiguration {
    static configure() {
        const Liquibase = require('liquibase').Liquibase;
        const myConfig = {
            ...(require('liquibase').POSTGRESQL_DEFAULT_CONFIG),
            changeLogFile: 'resources/liquibase/db.changelog.xml',
            url: 'jdbc:postgresql://localhost:5432/postgres',
            username: 'postgres',
            password: 'postgres',
        }
        const liquibaseInstance = new Liquibase(myConfig);

        liquibaseInstance.status();
        liquibaseInstance.run('update')
            .then(() => console.log('success'))
            .catch((err) => console.log('fail', err));
    }
}