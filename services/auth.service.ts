import UserModel from '../models/user.model';

export class AuthService {
    public login(email: string, password: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {

        });
    }

    public register(email: string, password: string, nickname: string): Promise<void> {
        return new Promise((resolve: Function, reject: Function): void => {

        });
    }

    public unregister(username: string): Promise<void> {
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