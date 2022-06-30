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

export const orderStatus = {
    pending: 0,
    inProgress: 1,
    inDelivery: 2,
    delivered: 3,
    list: function () {
        return [this.pending, this.inProgress, this.inDelivery, this.delivered];
    }
}
