// src/models/tb_cbib_kapal.js
import { DataTypes } from "sequelize";
import { db_kapal } from "../../config/Database.js";

const TbCbibKapal = db_kapal.define(
  "tb_cbib_kapal",
  {
    id_cbib: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    no_cbib: {
      type: DataTypes.STRING(20),
    },
    nama_kapal: {
      type: DataTypes.STRING(150),
    },
    kode_provinsi: {
      type: DataTypes.STRING(2),
    },
    nama_provinsi: {
      type: DataTypes.STRING(100),
    },
    tgl_terbit: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tb_cbib_kapal",
    timestamps: false,
  }
);

export default TbCbibKapal;
