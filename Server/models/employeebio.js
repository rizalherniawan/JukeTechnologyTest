'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeeBio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  employeeBio.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "First name column must be filled"
        },
        len: {
          args:[2,50],
          msg: "First name must be at least comprised of 2 characters and maximum of 50 characters"
        }
      }
    },
    lastName: DataTypes.STRING,
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "required to input phone number"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: {
          args: /^((\+)62|0)?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
          msg: "Please input correct phone number"
        },
        notNull: {
          args: true,
          msg: "required to input phone number"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Please input correct email"
        },
        notNull: {
          args: true,
          msg: "required to input email"
        }
      }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2,50],
          msg: "province name must be at least comprised of 2 characters and maximum of 50 characters"
        },
        notNull: {
          args: true,
          msg: "required to input province name"
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2,50],
          msg: "city name must be at least comprised of 2 characters and maximum of 50 characters"
        },
        notNull: {
          args: true,
          msg: "required to input city name"
        }
      }
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2,50],
          msg: "address name must be at least comprised of 2 characters and maximum of 50 characters"
        },
        notNull: {
          args: true,
          msg: "required to input address name"
        }
      }
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "required to input zip code"
        },
        isInt: {
          args: true,
          msg: "please input correct zip code"
        }
      }
    },
    ktpNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[3]{1}?[0-9]{15}$/,
          msg: "please input right id card number"
        }
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["CEO", "BOD", "Manager", "Supervisor", "Staff"]]
        },
        notNull: {
          args: true,
          msg: "position required to be filled",
        }
      }
    },
    bankAccount: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "bank account required to be filled"
        },
      }
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]{10,16}$/,
          msg: "please input right bank account number"
        },
        notNull: {
          args: true,
          msg: "it is required to fill in account number"
        }
      }
    },
    file: {
      type: DataTypes.STRING,
    },
    fileSize: {
      type: DataTypes.BIGINT,
      validate: {
        max: 500000
      }
    }
  }, {
    sequelize,
    modelName: 'employeeBio',
    tableName: 'employeeBios'
  });
  return employeeBio;
};