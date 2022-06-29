import bcrypt from 'bcrypt';
import {bodyPick} from "../middleware/utils";
import sequelize from "./setup/db-mysql-setup";
import {DataTypes, Model} from "sequelize";
import Role from "./role.model";


const config = {
    tableName: 'Users',
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
    roleId: string;
    role: Role;
    accessToken: string;
    refreshToken?: string;

    toJSON() {

        return bodyPick(['id', 'firstName', 'lastName', 'email', 'address', 'phone', 'role'], this);

    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
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
            isEmail: {
                msg: 'Email must be a valid email address'
            }
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
            is: {
                args: /^\+?[0-9]{10,15}$/,
                msg: 'Phone must be a valid phone number'
            },
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
        allowNull: true
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, config);

Role.hasMany(User, {foreignKey: 'roleId', as: 'users'});
User.belongsTo(Role, {foreignKey: 'roleId', as: 'role'});

User.beforeSave((user: User) => {
    if (user.changed('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.getDataValue('password'), salt);
        user.setDataValue('password', hash);
    }
});

export default User;
