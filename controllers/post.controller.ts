import { Router, Request, Response } from 'express';

import { PostService } from '../services/post.service'
import { Controller } from './controller';

import { JWT } from '../utils/jwt';

import imageUpload from '../utils/fileSave';

export class PostController extends Controller {
    private postService: PostService = new PostService();
    protected router: Router = Router();

    public constructor () {
        super();
        this.router.post('/create', imageUpload.single('image'), this.create);
        this.router.post('/createPart', imageUpload.single('image'), this.createPart);
        this.router.get('/readAll', this.readAll);
        this.router.post('/readOne', this.readOne);
        this.router.delete('/remove', this.remove);
        this.router.put('/updatePart', imageUpload.single('image'), this.updatePart);
    }
    
    public async create(req: Request, res: Response): Promise<void> {
        let { token, title, subtitle } = req.body;
        let email = JWT.decodeToken(token).email;
        
        let file = (req as any).file;
        if (!file) {
            super.ResponseBadRequest(res, { err: "file not found" });
            return;
        }

        let { filename } = file;

        try {
            await new PostService().create(email, filename, title, subtitle);
            
            super.ResponseSuccess(res, {});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }
    
    public async createPart(req: Request, res: Response): Promise<void> {
        let { token, description, partId, postId } = req.body;
        let email = JWT.decodeToken(token).email;
        
        let file = (req as any).file;
        if (!file) {
            super.ResponseBadRequest(res, { err: "file not found" });
            return;
        }

        let { filename } = file;

        try {
            await new PostService().createPart(email, filename, description, partId, postId);
            
            super.ResponseSuccess(res, {});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }
    
    public async readAll(req: Request, res: Response): Promise<void> {
        try {
            let result = await new PostService().readAll();
            
            super.ResponseSuccess(res, {result});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }
    
    public async readOne(req: Request, res: Response): Promise<void> {
        let { token, postId } = req.body;
        let email;

        if (token != undefined)
            email = JWT.decodeToken(token).email;
        else
            email = "##"

        try {
            let result = await new PostService().readOne(email, postId);
            
            super.ResponseSuccess(res, {recipe: result});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }
    
    public async remove(req: Request, res: Response): Promise<void> {
        let { postId } = req.body;
        try {
            await new PostService().remove(postId);
            
            super.ResponseSuccess(res, {});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }
    
    public async updatePart(req: Request, res: Response): Promise<void> {
        let { token, postId, partId, description } = req.body;
        let email = JWT.decodeToken(token).email;
        
        let file = (req as any).file;
        if (!file) {
            super.ResponseBadRequest(res, { err: "file not found" });
            return;
        }

        let { filename } = file;

        try {
            await new PostService().updatePart(email, filename, description, postId, partId);
            
            super.ResponseSuccess(res, {});
        } catch (err) {
            super.ResponseInternalServerError(res, {err});
        }
    }

    public get controllerRouter() {
        return this.router
    }
}


export default new PostController().controllerRouter;