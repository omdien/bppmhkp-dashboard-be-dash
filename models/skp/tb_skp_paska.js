// models/tb_skp_paska.js
import { DataTypes } from "sequelize";
import { db_skp } from "../../config/Database.js";

const TbSkpPaska = db_skp.define(
  "tb_skp_paska",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // karena NO/Excel manual
    },
    nama_upi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nib: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provinsi_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    provinsi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    regency_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kota_kabupaten: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skala_usaha: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jenis_permohonan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tanggal_pengajuan: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tanggal_rekomendasi: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tanggal_terbit: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tanggal_kadaluarsa: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nomor_skp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama_produk: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jenis_olahan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    peringkat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tb_skp_paska",
    timestamps: false, // karena tabel Excel tidak ada created_at/updated_at
  }
);

export default TbSkpPaska;
