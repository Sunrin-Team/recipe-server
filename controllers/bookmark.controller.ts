import { Router, Request, Response } from 'express';

import { BookmarkService } from '../services/bookmark.service'
import { Controller } from './controller';
import { JWT } from '../utils/jwt';

export class BookmarkController extends Controller {
    private bookmarkService: BookmarkService = new BookmarkService();
    protected router: Router = Router();

    public constructor () {
        super();
        this.router.post('/create', this.create);
        this.router.post('/remove', this.remove);
        this.router.post('/readAll', this.readAll);
    }
    
    public async create(req: Request, res: Response): Promise<void> {
        let { token, postId } = req.body;

        try {
            let email = JWT.decodeToken(token).email;
            await new BookmarkService().create(email, postId);
            
            super.ResponseSuccess(res, {});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }
    
    public async remove(req: Request, res: Response): Promise<void> {
        let { token, postId } = req.body;
        
        try {
            let email = JWT.decodeToken(token).email;
            await new BookmarkService().remove(email, postId);
            
            super.ResponseSuccess(res, {});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }
    
    public async readAll(req: Request, res: Response): Promise<void> {
        let { token } = req.body;
        
        try {
            let email = JWT.decodeToken(token).email;
            let result = await new BookmarkService().readAll(email);
            
            super.ResponseSuccess(res, {result});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }

    public get controllerRouter() {
        return this.router
    }
}


export default new BookmarkController().controllerRouter;