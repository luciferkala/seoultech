import { Model, Sequelize, Optional } from "sequelize";
import { PostModelTypes } from "@src/vo/auth/models/PostModel";
import { PostDataTypes } from "@src/vo/auth/controllers/Post";

// interface UserCreationAttributes
//     extends Optional<SignUpTypes.SignUpBody, "email"> {}
class Post
    // extends Model<SignUpTypes.SignUpBody, UserCreationAttributes>
    extends Model
    implements PostDataTypes.Body {
    public idx!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public boardName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: PostModelTypes.IBasePostTableOptions = {
            sequelize: connection,
            tableName: "Post"
        };
        return Post.init(PostModelTypes.attr, opt);
    }
}

export default Post;
