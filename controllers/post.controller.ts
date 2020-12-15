import { Router, Request, Response } from 'express';

import { PostService } from '../services/post.service'
import { Controller } from './controller';

export class PostController extends Controller {
    private postService: PostService = new PostService();
    protected router: Router = Router();

    public constructor () {
        super();
        this.router.post('/create', this.create);
    }
    
    public async create(req: Request, res: Response): Promise<void> {
        let { username, password } = req.body;
        
        try {
            await this.postService.createPost(username, password);
            
            super.ResponseSuccess(res, {});
        } catch (err) {
            if (err == "유저가 이미 존재함") {
                super.ResponseForbidden(res, {});
            } else {
                super.ResponseInternalServerError(res, {err});
            }
        }
    }
    public get controllerRouter() {
        return this.router
    }
}


export default new PostController().controllerRouter;