import { jest } from "@jest/globals";

/* ============================================================
   MOCK REPOSITORY
   ============================================================ */
await jest.unstable_mockModule("../repositories/skp.repository.js", () => ({
  countResume: jest.fn(),
  trenBulanan: jest.fn(),
  groupCount: jest.fn(),
}));

// Import SETELAH mock
const Service = await import("../services/dshSKP.service.js");
const Repo = await import("../repositories/skp.repository.js");

/* ============================================================
   GLOBAL SETUP
   ============================================================ */
beforeEach(() => {
  jest.clearAllMocks();
});

/* ============================================================
   RESUME
   ============================================================ */
describe("getResumeSKP", () => {
  it("should return resume data from repository", async () => {
    const mockResult = {
      sertifikat: 100,
      upi: 50,
      provinsi: 10,
      kabupaten: 20,
    };

    Repo.countResume.mockResolvedValue(mockResult);

    const result = await Service.getResumeSKP(
      "2025-01-01",
      "2025-12-31"
    );

    expect(Repo.countResume).toHaveBeenCalledWith(
      "2025-01-01",
      "2025-12-31"
    );
    expect(result).toEqual(mockResult);
  });
});

/* ============================================================
   TREN BULANAN
   ============================================================ */
describe("getTrenBulanan", () => {
  it("should return 12 months with zero-filled data", async () => {
    Repo.trenBulanan.mockResolvedValue([
      { bulan: 1, jumlah: "5" },
      { bulan: 3, jumlah: "10" },
    ]);

    const result = await Service.getTrenBulanan(
      "2025-01-01",
      "2025-12-31"
    );

    expect(result).toHaveLength(12);

    expect(result[0]).toEqual({ bulan: 1, jumlah: 5 });
    expect(result[1]).toEqual({ bulan: 2, jumlah: 0 });
    expect(result[2]).toEqual({ bulan: 3, jumlah: 10 });
  });
});

/* ============================================================
   KOMPOSISI DATA
   ============================================================ */
describe("Komposisi functions", () => {
  const cases = [
    ["getKomposisiPeringkat", "peringkat"],
    ["getKomposisiPermohonan", "jenis_permohonan"],
    ["getKomposisiOlahan", "jenis_olahan"],
    ["getDistribusiSkalaUsaha", "skala_usaha"],
  ];

  it.each(cases)(
    "%s should call groupCount with field %s",
    async (serviceName, field) => {
      Repo.groupCount.mockResolvedValue([
        { [field]: "A", jumlah: 10 },
      ]);

      const result = await Service[serviceName](
        "2025-01-01",
        "2025-12-31"
      );

      expect(Repo.groupCount).toHaveBeenCalled();

      const [calledField, start, end] =
        Repo.groupCount.mock.calls[0];

      expect(calledField).toBe(field);
      expect(start).toBe("2025-01-01");
      expect(end).toBe("2025-12-31");

      expect(result).toEqual([
        { [field]: "A", jumlah: 10 },
      ]);
    }
  );
});

/* ============================================================
   TOP DATA (TANPA LIMIT)
   ============================================================ */
describe("Top data functions (without limit)", () => {
  const cases = [
    ["getTopProvinsi", "provinsi"],
    ["getTopKabupaten", "kota_kabupaten"],
    ["getTopUPI", "nib"],
  ];

  it.each(cases)(
    "%s should call groupCount without limit",
    async (serviceName, field) => {
      Repo.groupCount.mockResolvedValue([
        { [field]: "X", jumlah: 99 },
      ]);

      await Service[serviceName](
        "2025-01-01",
        "2025-12-31"
      );

      expect(Repo.groupCount).toHaveBeenCalled();

      const [calledField, start, end, limit] =
        Repo.groupCount.mock.calls[0];

      expect(calledField).toBe(field);
      expect(start).toBe("2025-01-01");
      expect(end).toBe("2025-12-31");
      expect(limit).toBeUndefined();
    }
  );
});

/* ============================================================
   TOP DATA (DENGAN LIMIT)
   ============================================================ */
describe("Top data functions (with limit)", () => {
  const cases = [
    ["getTopProvinsi", "provinsi"],
    ["getTopKabupaten", "kota_kabupaten"],
    ["getTopUPI", "nib"],
  ];

  it.each(cases)(
    "%s should pass limit to repository",
    async (serviceName, field) => {
      Repo.groupCount.mockResolvedValue([
        { [field]: "X", jumlah: 99 },
      ]);

      await Service[serviceName](
        "2025-01-01",
        "2025-12-31",
        10
      );

      const [, , , limit] =
        Repo.groupCount.mock.calls[0];

      expect(limit).toBe(10);
    }
  );
});
