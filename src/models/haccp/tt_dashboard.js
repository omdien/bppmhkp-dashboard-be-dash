import { Sequelize } from "sequelize";
import { db_siha } from "../../config/Database.js";

const { DataTypes } = Sequelize;

const CURRENT_YEAR = new Date().getFullYear();

const Tt_dashboard = db_siha.define(
    "tt_dashboard",
    {
        dashboard_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tahun: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isTahunValid(value) {
                    if (value && (value < 1900 || value > CURRENT_YEAR)) {
                        throw new Error(`Tahun harus antara 1900 hingga ${CURRENT_YEAR}`);
                    }
                }
            }
        },
        kode: {
            type: DataTypes.STRING(10),
            allowNull: true,
            validate: {
                len: [0, 10] // Maksimal 10 karakter
            }
        },
        nilai1: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null // Jelasin default value
        },
        nilai2: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        nilai3: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        nilai4: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        // Optimasi indeks
        indexes: [
            {
                fields: ['tahun'] // Index untuk kolom tahun
            },
            {
                fields: ['kode'] // Index untuk kolom kode
            }
        ]
    }
);

export default Tt_dashboard;