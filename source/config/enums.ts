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

export const restauStatus = {
    opened: 'opened',
    pending: 'pending',
    closed: 'closed',
    list: function () {
        return [this.open, this.pending, this.closed];
    }
}

export const restauCategories = {
    american: 'american',
    burger: 'burger',
    french: 'french',
    halal: 'halal',
    italian: 'italian',
    japanese: 'japanese',
    pizza: 'pizza',
    sushi: 'sushi',
    thai: 'thai',
    list: function (): string[] {
        return [this.american, this.burger, this.french, this.halal, this.italian, this.japanese, this.pizza, this.sushi, this.thai];
    }
}
