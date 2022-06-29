export const roles = {
    deliverer: 'deliverer',
    restau: 'restau',
    client: 'client',
    apiUser: 'apiUser',
    extDev: 'extDev',
    commServ: 'commServ',
    techServ: 'techServ',
    list: function () {
        return [this.deliverer, this.restau, this.client, this.apiUser, this.extDev, this.commServ, this.techServ];
    }
}
