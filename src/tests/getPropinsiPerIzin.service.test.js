// src/tests/getPropinsiPerIzin.service.test.js
import { getPropinsiPerIzin } from "../services/dshPrimer.service.js";
import * as Repo from "../repositories/dshPrimer.repository.js";

jest.mock("../repositories/dshPrimer.repository.js");

describe("getPropinsiPerIzin", () => {
  it("should return data propinsi untuk OSS (CPIB)", async () => {
    Repo.getPropinsiPerIzin.mockResolvedValue([
      { URAIAN_PROPINSI: "Jawa Barat", JUMLAH: 10 },
      { URAIAN_PROPINSI: "Jawa Timur", JUMLAH: 8 },
    ]);

    const result = await getPropinsiPerIzin({
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      kdIzin: "032000000034",
      limit: 5,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("URAIAN_PROPINSI");
  });

  it("should return data propinsi untuk CBIB Kapal", async () => {
    Repo.getPropinsiPerIzin.mockResolvedValue([
      { URAIAN_PROPINSI: "DKI Jakarta", JUMLAH: 4 },
    ]);

    const result = await getPropinsiPerIzin({
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      kdIzin: "032000000033",
      limit: 5,
    });

    expect(result.length).toBe(1);
    expect(result[0].URAIAN_PROPINSI).toBe("DKI Jakarta");
  });
});
