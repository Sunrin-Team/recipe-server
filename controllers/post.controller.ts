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
        let { email, password, nickname } = req.body;
        
        try {
            await new PostService().createPost(email, password, nickname);
            super.ResponseSuccess(res, {});
        } catch (err) {
            if (err == "유저가 이미 존재함") {
                super.ResponseForbidden(res, {});
            } else {
                console.log(err, "err")
                super.ResponseInternalServerError(res, {err});
            }
        }
    }
    public get controllerRouter() {
        return this.router
    }
}


export default new PostController().controllerRouter;