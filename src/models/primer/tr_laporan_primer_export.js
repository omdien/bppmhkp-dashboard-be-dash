import { Sequelize } from "sequelize";
import { db_report_primer } from "../../config/Database.js";

const { DataTypes } = Sequelize;

const ReportPrimerExport = db_report_primer.define(
  "report_primer_export",
  {
    id_export: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idchecklist: {
      type: DataTypes.STRING(25),
      allowNull: true // Diubah ke true agar mendukung data MANUAL
    },
    tgl_izin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_izin: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jenis_izin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    kd_izin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ur_izin_singkat: { // <-- Tambahkan ini
      type: DataTypes.STRING(20),
      allowNull: true
    },
    kd_daerah: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nama_izin: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    no_izin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nib: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    tgl_permohonan: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status_checklist: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sts_aktif: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: "1"
    },
    komoditas: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    no_referensi: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    uraian_propinsi: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    kbli: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    uraian_usaha: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    npwp_perseroan: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nama_perseroan: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    alamat_perseroan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rt_rw_perseroan: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    kelurahan_perseroan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    perseroan_daerah_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    kode_pos_perseroan: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nomor_telpon_perseroan: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email_perusahaan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    total_sesuai: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "0"
    },
    total_minor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "0"
    },
    total_mayor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "0"
    },
    total_kritis: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "0"
    },
    total_hasil: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sumber_data: {
      type: DataTypes.ENUM('SISTEM', 'MANUAL'),
      allowNull: true,
      defaultValue: 'SISTEM'
    },
    tgl_tarik_data: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    }
  },
  {
    Sequelize,
    tableName: "tr_laporan_primer_export",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id_export" }]
      },
      {
        name: "IDX_IDCHECKLIST",
        using: "BTREE",
        fields: [{ name: "idchecklist" }]
      },
      {
        name: "IDX_NIB",
        using: "BTREE",
        fields: [{ name: "nib" }]
      },
      {
        name: "IDX_TGL_IZIN",
        using: "BTREE",
        fields: [{ name: "tgl_izin" }]
      }
    ]
  }
);

export default ReportPrimerExport;