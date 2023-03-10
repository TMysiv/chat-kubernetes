import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
    async validateToken(rawToken: string) {
        return axios
            .post(`${process.env.AUTH_URL}/validateToken`, { token: rawToken })
            .then((data) => data.data)
            .catch((e) => { return { error: e.response.data.error }; });
    }
}
