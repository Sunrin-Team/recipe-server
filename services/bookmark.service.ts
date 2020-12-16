import BookmarkModel from '../models/bookmark.model';
import PostModel from '../models/post.model';

export class BookmarkService {
    public create(email: string, postId: number): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await BookmarkModel.create({email, postId});
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    
    public remove(email: string, postId: number): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await BookmarkModel.findOne({where: {email, postId}});
                if (result !== null) {
                    result.destroy();
                    resolve();
                } else {
                    reject("존재하지 않는 즐겨찾기");
                }
            } catch (err) {
                reject(err);
            }
        });
    }
    
    public readAll(email: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await BookmarkModel.findAll({where:{email}});
                let posts: any[] = [];
                for (let bookmark of result) {
                    let post = await PostModel.findOne({where:{id: bookmark.getDataValue("postId")}});
                    posts.push(post);
                }
                resolve(posts);
            } catch (err) {
                reject(err);
            }
        });
    }
}