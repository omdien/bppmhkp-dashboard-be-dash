import { Sequelize } from "sequelize";
import { db_ekspor } from "../../config/Database.js";

const { DataTypes } = Sequelize;


const Tr_report_ekspor = db_ekspor.define(
  "tr_report_ekspor",
  {
    nomor_aju: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    kode_upt: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: ""
    },
    nama_upt: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    kode_trader: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    nama_trader: {
      type: DataTypes.STRING(145),
      allowNull: false,
      defaultValue: ""
    },
    alamat_trader: {
      type: DataTypes.STRING(245),
      allowNull: false,
      defaultValue: ""
    },
    npwp: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: ""
    },
    nama_upi: {
      type: DataTypes.STRING(145),
      allowNull: false,
      defaultValue: ""
    },
    no_reg_upi: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    alamat_upi: {
      type: DataTypes.STRING(245),
      allowNull: false,
      defaultValue: ""
    },
    kode_partner: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    nama_partner: {
      type: DataTypes.STRING(145),
      allowNull: false,
      defaultValue: ""
    },
    alamat_partner: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: ""
    },
    tanggal_aju: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tanggal_smkhp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tanggal_berangkat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    bulan: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    tahun: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ""
    },
    konsumsi: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    tawar_laut: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    ket_bentuk: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ""
    },
    kode_pel_asal: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    pel_asal: {
      type: DataTypes.STRING(105),
      allowNull: false,
      defaultValue: ""
    },
    kode_pel_muat: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    pel_muat: {
      type: DataTypes.STRING(105),
      allowNull: false,
      defaultValue: ""
    },
    kode_negara_partner: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    negara_tujuan: {
      type: DataTypes.STRING(55),
      allowNull: false,
      defaultValue: ""
    },
    kode_pel_bongkar: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    pel_bongkar: {
      type: DataTypes.STRING(105),
      allowNull: false,
      defaultValue: ""
    },
    hscode: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    kel_ikan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    id_ikan: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: ""
    },
    nm_dagang: {
      type: DataTypes.STRING(215),
      allowNull: true
    },
    nm_latin: {
      type: DataTypes.STRING(185),
      allowNull: true
    },
    netto: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    jumlah: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    satuan: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    nilai_rupiah: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    kurs_usd: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    no_hc: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    cara_angkut: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    alat_angkut: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    voyage: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'tr_report_ekspor',
  timestamps: false,
  freezeTableName: true,
  id: false 
});

export default Tr_report_ekspor;
