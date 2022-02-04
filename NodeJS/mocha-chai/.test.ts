import { expect } from "chai";
import mapNumbers from "../../custom-functions/mapNumbers";

describe("validator mapNumbers()", () => {
  it("should map numbers to some number array", () => {
    expect(mapNumbers(0.5, 0, 1, 0, 100)).to.be.equal(50);
  });
  it("should map numbers to some number array", () => {
    expect(mapNumbers(6, 0, 10, 0, 5)).to.be.equal(3);
  });
  it("should map numbers to some number array", () => {
    expect(mapNumbers(11, 10, 20, 0, 100)).to.be.equal(10);
  });
  it("should map numbers to some number array", () => {
    expect(mapNumbers(1, 0, 1, 0, 100)).to.be.equal(100);
  });
});
