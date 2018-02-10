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
    allowNull: false,
    valiate: {
      startsWithCapitalLetter(titleVal) {
        console.log('0', titleVal.charAt(0))
        if (titleVal.charAt(0) === titleVal.charAt(0).toUpperCase()) {
          // ...
          console.log('1')
        } else {
          console.log('2')
          throw new Error('Title first char should be uppercase')
        }
      }
    }
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
  }
})

connection
  .sync({
    force: true,
    logging: console.log
  })
  .then(() => {
    return Article.create({
      title: 'aBl',
      body: 'hedsadas'
    })
  })
  .catch(err => {
    console.log(err)
  })
