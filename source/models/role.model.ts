export class Role {
    id: string;
    name: string;
    desc: string;


    static generateModel(json: any): Role {
        const role = new Role();
        role.id = json.id;
        role.name = json.name;
        role.desc = json.desc;

        return role;
    }
}
