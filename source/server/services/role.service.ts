import Role from "../../db/role.model";

export class RoleService {

    static findWithName(name: string): Promise<Role> {
        return Role.findOne({where: {name: name}});
    }

}
