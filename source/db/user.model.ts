import validator from "validator";
import bcrypt from 'bcrypt';
import {bodyPick} from "../middleware/utils";
import sequelize from "./setup/db-mysql-setup";
import {DataTypes, Model} from "sequelize";
import Role from "./role.model";


const config = {
    tableName: 'TransactionTokens',
    timestamps: true,
    sequelize: sequelize
};

class User extends Model {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    address!: string;
    phone!: string;
    password!: string;
    roleId!: string;
    role: Role;
    accessToken!: string;
    refreshToken!: string;

    toJSON() {

        return bodyPick(['id', 'firstName', 'lastName', 'email','address', 'phone', 'roleId', 'createdAt', 'updatedAt'], this);

    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: {
                msg: 'First name must be at least 2 characters',
                args: [2]
            },
            max: {
                msg: 'First name must be less than 30 characters',
                args: [30]
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: {
                msg: 'Last name must be at least 2 characters long',
                args: [2],
            },
            max: {
                msg: 'Last name must be less than 30 characters',
                args: [30]
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: {
                msg: 'Address must be at least 5 characters long',
                args: [5]
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: {
                msg: 'Phone must be at least 4 characters long',
                args: [4],
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: {
                msg: 'Password must be at least 6 characters long',
                args: [6],
            }
        }
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, config);

Role.hasMany(User, {as: 'users'});
User.belongsTo(Role, {foreignKey: 'roleId', as: 'role'});

User.beforeSave((user: User) => {
    if (user.changed('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.getDataValue('password'), salt);
        user.setDataValue('password', hash);
    }
});

export default User;
