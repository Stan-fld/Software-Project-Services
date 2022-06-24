import axios, {AxiosInstance} from "axios";

export abstract class HttpService {

    http: AxiosInstance

    /**
     * HttpService constructor
     * @param transactionToken
     * @protected
     */
    protected constructor(transactionToken: string) {
        this.http = axios.create({
            baseURL: 'http://nginx:80/',
            headers: {
                'Content-Type': 'application/json',
                'trx-auth': transactionToken
            }
        });
    }
}
