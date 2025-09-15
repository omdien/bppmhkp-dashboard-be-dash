import { Sequelize } from "sequelize";
import  { db_hc }  from "../config/Database.js";

const { DataTypes } = Sequelize;


const Tb_propinsi = db_hc.define(
  "tb_propinsi",
  {
    KODE_PROPINSI: {
      type: Sequelize.STRING(2),
      allowNull: false,
      primaryKey: true,
    },
    URAIAN_PROPINSI: DataTypes.STRING(50),
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

export default Tb_propinsi;