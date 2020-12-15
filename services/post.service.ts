import UserModel from '../models/user.model';

export class PostService {
    public createPost(email: string, password: string, nickname: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                const result = await UserModel.create({email, password, nickname});
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    public readPost(username: string, password: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {

        });
    }

    public updatePost(username: string, password: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {

        });
    }

    public deletePost(username: string, password: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {

        });
    }
}

/*
            UserModel.findOne({username: crypto.encrypt(username)}, (err: object, res: UserModelT): void => {
                if (err) {
                    reject(err);
                } else if (res == null) {
                    new UserModel({username: crypto.encrypt(username), password: crypto.encrypt(password)}).save((err: object): void => {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    })
                } else {
                    reject("the user already exist.");
                }
            }); */