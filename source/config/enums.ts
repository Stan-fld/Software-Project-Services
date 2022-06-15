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

export const reqCat = {
    get: 'GET',
    put: 'PUT',
    patch: 'PATCH',
    post: 'POST',
    delete: 'DELETE',
    option: 'OPTION',
    list: function () {
        return [this.get, this.put, this.patch, this.post, this.delete, this.option];
    }
}
