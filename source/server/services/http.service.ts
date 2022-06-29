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
    openUserRestaurant(clientId: string): Promise<any> {
        return this.http.post('transaction/OR', {userId: clientId});
    }

    /**
     * Service to request service restaurant to change status to allowed.
     */
    allowUserDeliverer(clientId: string): Promise<any> {
        return this.http.post('transaction/AD', {userId: clientId});
    }


}
