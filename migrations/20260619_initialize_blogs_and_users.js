const {DataTypes, Sequelize} = require('sequelize')

module.exports = {
  up: async({context: queryInterface}) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        },
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    })
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      year: {
        type: DataTypes.INTEGER,
        validate: {
          max: new Date().getFullYear(),
          min: 1991
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {model: 'users', key: 'id'}
      },
      created_at: {
        type: DataTypes.DATE 
      },
      updated_at: {
        type: DataTypes.DATE
      }
    })
    await queryInterface.createTable('reading_lists',{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'}
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'blogs', key: 'id'}
      }
    })
    await queryInterface.createTable('_sessions_', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'}
      }
    })
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.dropTable('_sessions_')
    await queryInterface.dropTable('reading_lists')
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  }
}