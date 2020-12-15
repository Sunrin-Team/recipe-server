import { Router, Request, Response } from 'express';

import { AuthService } from '../services/auth.service'
import { Controller } from './controller';
import { JWT } from '../utils/jwt';

export class AuthController extends Controller {
    private authService: AuthService = new AuthService();
    protected router: Router = Router();

    public constructor () {
        super();
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
        this.router.post('/unregister', this.unregister);
    }
    
    
    public async login(req: Request, res: Response): Promise<void> {
        let { username, password } = req.body;
        
        try {
            await this.authService.login(username, password);
            
            super.ResponseSuccess(res, {token: JWT.encodeToken({
                username: username
            })});
        } catch (err) {
            if (err == "유저를 찾을 수 없음") {
                super.ResponseNotFound(res, {});
            } else {
                super.ResponseInternalServerError(res, {err});
            }
        }
    }
    
    public async register(req: Request, res: Response): Promise<void>{
        let { username, password, nickname } = req.body;  
        
        try {
            await this.authService.register(username, password, nickname);

            super.ResponseSuccess(res, {token: JWT.encodeToken({
                username: username
            })});
        } catch (err) {
            if (err == "이미 유저가 존재함") {
                super.ResponseForbidden(res, {});
            } else {
                super.ResponseInternalServerError(res, {err});
            }    
        }
    }
    
    public async unregister(req: Request, res: Response): Promise<void>{
        let { username } = req.body;  
        
        try {
            await this.authService.unregister(username);

            super.ResponseSuccess(res, {});
        } catch (err) {
            if (err == "유저를 찾을 수 없음") {
                super.ResponseNotFound(res, {});
            } else {
                super.ResponseInternalServerError(res, {err});
            }    
        }
    }

    public get controllerRouter() {
        return this.router
    }
}


export default new AuthController().controllerRouter;