const Sequelize = require('sequelize')

const connection = new Sequelize('sequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

const Article = connection.define('article', {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    defaultValue: 'Coming Soon!'
  }
}, {
  timestamps: false
})

connection.sync({
  force: true,
  logging: console.log
}).then(() => {
 console.log('Done')
})
