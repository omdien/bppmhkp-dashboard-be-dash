// src/tests/dshPrimer.service.test.js
import { rekapIzinPrimer } from "../services/dshPrimer.service.js";
import * as Repo from "../repositories/";

jest.mock("../repositories/dshPrimer.repository.js");

describe("rekapIzinPrimer", () => {
  it("should return data dan rekap izin primer", async () => {
    // MOCK data repository
    Repo.getRekapIzinPrimer.mockResolvedValue({
      data: [
        { NM_UNIT: "UPT A", JUMLAH: 5 },
        { NM_UNIT: "UPT B", JUMLAH: 3 },
      ],
      rekap: {
        total: 8,
      },
    });

    const result = await rekapIzinPrimer({
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      limit: 10,
    });

    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("rekap");
    expect(result.rekap.total).toBe(8);
    expect(result.data.length).toBe(2);
  });
});
