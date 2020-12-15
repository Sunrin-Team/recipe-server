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
        this.router.delete('/unregister', this.unregister);
    }
    
    
    public async login(req: Request, res: Response): Promise<void> {
        let { email, password } = req.body;
        
        try {
            await new AuthService().login(email, password);
            
            super.ResponseSuccess(res, {token: JWT.encodeToken({
                email
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
        let { email, password, nickname } = req.body;  
        
        try {
            await new AuthService().register(email, password, nickname);

            super.ResponseSuccess(res, {token: JWT.encodeToken({
                email
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
        let { email } = req.body;  
        
        try {
            await new AuthService().unregister(email);

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