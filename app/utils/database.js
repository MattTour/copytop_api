import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:YourRootPass@db/copytop');

try {
    await sequelize.authenticate();
    console.log('Connection successful');
}
catch (error) {
    console.error('Unable to connect', error);
}

export default sequelize;
