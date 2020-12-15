import PostModel from '../models/post.model';
import PostpartModel from '../models/postpart.model';

export class PostService {
    public create(email: string, filename: string, title: string, subtitle: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await PostModel.create({writer: email, image: "http://recipeapp.saintdev.kr/"+filename, title, subTitle: subtitle});
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    public createPart(email: string, filename: string, description: string, partId: string, postId: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await PostpartModel.create({writer: email, image: "http://recipeapp.saintdev.kr/"+filename, text: description, partNumber: partId, postId});
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    public readAll(): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await PostModel.findAll();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }
    public readOne(postId: number): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let post: any = await PostModel.findOne({where: {id: postId}});
                let postparts = await PostpartModel.findAll({where: {postId}});
                post.dataValues.actions = postparts;
                console.log(post);
                resolve(post);
            } catch (err) {
                reject(err);
            }
        });
    }
    public remove(postId: number): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await PostModel.findOne({where: {id: postId}});
                if (result !== null) {
                    result.destroy();
                    resolve();
                } else {
                    reject("존재하지 않는 포스트");
                }
            } catch (err) {
                reject(err);
            }
        });
    }
    public updatePart(email: string, filename: string, description: string, postId: number, partId: number): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {

        });
    }
}