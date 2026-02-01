import { Sequelize } from "sequelize";
import { db_siha } from "../../config/Database.js";

const { DataTypes } = Sequelize;

const Vw07_sertifikasi = db_siha.define(
  "vw07_sertifikasi",
  {
    nm: {
      type: DataTypes.STRING(921),
      allowNull: true
    },
    upi_name: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    upi_addr: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_provinsi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nm_provinsi: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    id_upt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kd_unit: {
      type: DataTypes.STRING(63),
      allowNull: true
    },
    upt: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    npwp: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    nib: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    npwp1: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    iso: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    upi_telp: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    upi_fax: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    upi_email: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    cp_name: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    cp_pos: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    cp_telp: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    cp_email: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    cp_pid: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    id_produk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nama_produk: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    nama_kategori: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    kd_kategori: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    latin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    grade: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    status_produk: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    ttgl_perbaikan: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tgl_inspeksi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status_upi: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    status_proses: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    no_seri: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kode: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    no_sert: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    no_sert_ad: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    tgl_terbit: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    thn_terbit: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    tgl_akhir: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status_sert: {
      type: DataTypes.STRING(765),
      allowNull: true
    },
    lama: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_upi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_surat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    no_haccp: {
      type: DataTypes.STRING(852),
      allowNull: true
    },
    no_haccp1: {
      type: DataTypes.STRING(879),
      allowNull: true
    },
    process_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tgl_lim: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tgl_lsk: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tgl_vsi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tgl_terima: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tgl_rekomendasi: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tgl_tugas: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
  Sequelize,
  tableName: 'vw07_sertifikasi',
  timestamps: false
});

export default Vw07_sertifikasi;