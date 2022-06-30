import axios, {AxiosInstance} from "axios";

export class HttpService {

    http: AxiosInstance

    /**
     * HttpService constructor
     * @param userToken
     * @protected
     */
    constructor(userToken: string) {
        this.http = axios.create({
            baseURL: 'http://nginx:80/',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': userToken
            }
        });
    }

    /**
     * Service to request service restaurant to change status to opened.
     */
    openUserRestaurant(userId: string): Promise<any> {
        return this.http.post('transaction/OR', {userId: userId});
    }

    /**
     * Service to request service restaurant to change status to closed.
     */
    closeMyRestaurant(): Promise<any> {
        return this.http.post('transaction/DR');
    }

    /**
     * Service to request service deliverer to change status to allowed.
     */
    allowUserDeliverer(userId: string): Promise<any> {
        return this.http.post('transaction/AD', {userId: userId});
    }

    /**
     * Service to request service deliverer to change status to revoked.
     */
    revokeMyDelivererAccount(): Promise<any> {
        return this.http.post('transaction/DD');
    }
}
