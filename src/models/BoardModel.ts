import { Model, Sequelize, Optional } from "sequelize";
import { BoardModelTypes } from "@src/vo/auth/models/BoardModel";
import { BoardDataTypes } from "@src/vo/auth/controllers/Board";

// interface UserCreationAttributes
//     extends Optional<SignUpTypes.SignUpBody, "email"> {}
class Board
    // extends Model<SignUpTypes.SignUpBody, UserCreationAttributes>
    extends Model
    implements BoardDataTypes.Body {
    public boardName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: BoardModelTypes.IBaseBoardTableOptions = {
            sequelize: connection,
            tableName: "Board"
        };
        return Board.init(BoardModelTypes.attr, opt);
    }
}

export default Board;
