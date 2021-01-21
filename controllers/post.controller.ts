import { Router, Request, Response } from 'express';

import { PostService } from '../services/post.service'
import { Controller } from './controller';

import { JWT } from '../utils/jwt';

export class PostController extends Controller {
    private postService: PostService = new PostService();
    protected router: Router = Router();

    public constructor () {
        super();
        this.router.get('/readAll', this.readAll);
    }
    
    public async create(req: Request, res: Response): Promise<void> {
        let { token, title, subTitle } = req.body;
        let email = JWT.decodeToken(token).email;
        
        let file = (req as any).file;
        if (!file) {
            super.ResponseBadRequest(res, { err: "file not found" });
            return;
        }

        let { filename } = file;

        try {
            let result = await new PostService().create(email, filename, title, subTitle);
            super.ResponseSuccess(res, {postId: result});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }
    
    public get controllerRouter() {
        return this.router
    }
}


export default new PostController().controllerRouter;