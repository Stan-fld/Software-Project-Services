import Role from "../../db/role.model";

export class RoleService {

    /**
     * Service to get role with name
     * @param name
     */
    static findWithName(name: string): Promise<Role> {
        return Role.findOne({where: {name: name}});
    }
}
