import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config"

//for typescript we need to create an interface for a user
export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema(
    {
        email: {required: true, type: String, unique: true},
        password: {required: true, type: String},
        name: {required: true, type: String},
    },
    {
        timestamps: true
    }
)
UserSchema.pre("save", async function(next : any) {
    let user = this as UserDocument;
    if(!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
    const hash = await bcrypt.hashSync(user.password, salt)

    user.password = hash
    return next();
})

UserSchema.methods.comparePassword = async function( candidatePassword: string ) {
    const user = this as UserDocument;
    return await bcrypt.compareSync(candidatePassword, user?.password).catch((e : any) => false); //returning the result
}

const User = mongoose.model<UserDocument>('user', UserSchema)
export default User