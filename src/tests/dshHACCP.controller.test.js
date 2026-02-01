import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

// 🔹 MOCK service
await jest.unstable_mockModule("../services/dshHACCP.service.js", () => ({
    getHACCPPerPropinsiPerGrade: jest.fn(),
}));

// 🔹 import SETELAH mock
const HACCPService = await import("../services/dshHACCP.service.js");
const HACCPController = await import("../controllers/dshHACCP.controller.js");

// 🔹 setup app express khusus test
const app = express();
app.use(express.json());

app.get(
    "/haccp-per-propinsi-grade",
    HACCPController.getHACCPPerPropinsiPerGrade
);

describe("HACCP Controller – getHACCPPerPropinsiPerGrade", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return HACCP data without limit", async () => {
        const mockResponse = {
            data: [
                {
                    nm_provinsi: "JAWA BARAT",
                    grade_a: 5,
                    grade_b: 3,
                    grade_c: 2,
                    jumlah: 10,
                },
            ],
            totHACCP: 10,
            totGradeA: 5,
            totGradeB: 3,
            totGradeC: 2,
        };

        HACCPService.getHACCPPerPropinsiPerGrade.mockResolvedValue(mockResponse);

        const res = await request(app)
            .get("/haccp-per-propinsi-grade")
            .query({
                startDate: "2025-01-01",
                endDate: "2025-12-31",
            });

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockResponse);

        expect(HACCPService.getHACCPPerPropinsiPerGrade).toHaveBeenCalledWith({
            startDate: "2025-01-01",
            endDate: "2025-12-31",
            limit: undefined,
        });
    });

    it("should pass limit when provided", async () => {
        HACCPService.getHACCPPerPropinsiPerGrade.mockResolvedValue({
            data: [],
            totHACCP: 0,
            totGradeA: 0,
            totGradeB: 0,
            totGradeC: 0,
        });

        const res = await request(app)
            .get("/haccp-per-propinsi-grade")
            .query({
                startDate: "2025-01-01",
                endDate: "2025-12-31",
                limit: "10",
            });

        expect(res.status).toBe(200);

        expect(HACCPService.getHACCPPerPropinsiPerGrade).toHaveBeenCalledWith({
            startDate: "2025-01-01",
            endDate: "2025-12-31",
            limit: 10,
        });
    });

    it("should return 500 if service throws error", async () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => { });

        HACCPService.getHACCPPerPropinsiPerGrade
            .mockRejectedValue(new Error("DB error"));

        const res = await request(app)
            .get("/haccp-per-propinsi-grade")
            .query({
                startDate: "2025-01-01",
                endDate: "2025-12-31",
            });

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ message: "DB error" });

        spy.mockRestore();
    });


});
