import UserModel from '../models/user.model';

export class AuthService {
    public login(email: string, password: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await UserModel.findOne({where: {email}});
                if (result?.getDataValue("password") == password)
                    resolve();
                else
                    reject("유저를 찾을 수 없음");
            } catch (err) {
                reject(err);
            }
        });
    }

    public register(email: string, password: string, nickname: string): Promise<void> {
        return new Promise(async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await UserModel.create({email, password, nickname});
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    public unregister(email: string): Promise<void> {
        return new Promise( async (resolve: Function, reject: Function): Promise<void> => {
            try {
                let result = await UserModel.findOne({where: {email}});
                if (result == null) {
                    reject();
                } else {
                    result?.destroy();
                    resolve("유저를 찾을 수 없음");
                }
            } catch (err) {
                reject(err);
            }
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