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
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    defaultValue: 'Coming Soon!',
    validate: {
      len: {
        args: [3, 100],
        msg: 'Body must be atleast 3 chars and less than 10 chars'
      }
    }
  },
  approved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  hooks: {
    beforeValidate() {
      console.log('beforeValidate')
    },
    afterValidate() {
      console.log('afterValidate')
    },
    beforeCreate() {
      console.log('beforeCreate')
    },
    afterCreate() {
      console.log('afterCreate')
    }
  }
})

connection
  .sync({
    force: true
  })
  .then(() => {
    return Article.bulkCreate([
      {
        title: 'dani',
        body: 'blaldsadasdas'
      },
      {
        title: 'dandsai',
        body: 'blaldsaadasddasdas'
      },
    ], {
      fields: ['title', 'body']
    })
  })
  .catch(err => {
    console.log(err)
  })
