import PostModel from '../models/post.model';
import PostpartModel from '../models/postpart.model';
import BookmarkModel from '../models/bookmark.model';
import PostPartModel from '../models/postpart.model';

export class PostService {
    public create(email: string, filename: string, title: string, subtitle: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await PostModel.create({writer: email, image: "http://recipeapp.saintdev.kr/static/"+filename, title, subTitle: subtitle});
                resolve(result.getDataValue("id"));
            } catch (err) {
                reject(err);
            }
        });
    }
    public createPart(email: string, filename: string, description: string, partId: string, postId: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await PostpartModel.create({writer: "", image: "http://recipeapp.saintdev.kr/static/"+filename, text: description, partNumber: partId, postId});
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
    public readOne(email: string, postId: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let post: any = await PostModel.findOne({where: {id: postId}});
                let postparts = await PostpartModel.findAll({where: {postId}});
                let bookmark = await BookmarkModel.findOne({where: {postId, email}});

                if (bookmark !== null)
                    post.dataValues.isBookmark = true;
                else
                    post.dataValues.isBookmark = false;

                if (email == post.writer)
                    post.dataValues.isWriter = true;
                else
                    post.dataValues.isWriter = false;

                post.dataValues.actions = postparts;
                resolve(post);
            } catch (err) {
                reject(err);
            }
        });
    }
    public remove(postId: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await PostModel.findOne({where: {id: postId}});
                if (result != null) {
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
    public updatePost(filename: string | null, title: string, subTitle: string, postId: number): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            let post: any = await PostModel.findOne({where: {id: postId}});
            if (post == null) {
                reject("존재하지 않는 포스트");
                return;
            }
            if (filename != null) {
                post.image = "http://recipeapp.saintdev.kr/static/"+filename;
            }

            post.title = title;
            post.subTitle = subTitle;
            await post.save();
            resolve();
        });
    }
    public updatePart(filename: string | null, description: string, postId: number, partId: number): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            let postpart: any = await PostPartModel.findOne({where: {postId, partNumber: partId}});
            if (postpart == null) {
                reject("존재하지 않는 포스트");
                return;
            }
            if (filename != null) {
                postpart.image = "http://recipeapp.saintdev.kr/static/"+filename;
            }

            postpart.text = description;
            await postpart.save();
            resolve();
        });
    }
}