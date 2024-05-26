import { clearStyles } from "../components/hooks/useDynamicStyle";

describe("clearStyles", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  test("removes styles not in fileNames", () => {
    const style1 = document.createElement("style");
    style1.id = "style1";
    style1.setAttribute("parent1", "⚡");
    document.head.appendChild(style1);

    const style2 = document.createElement("style");
    style2.id = "style2";
    style2.setAttribute("parent1", "⚡");
    document.head.appendChild(style2);

    clearStyles({ parent: "parent1", fileNames: ["style1"] });

    expect(document.getElementById("style1")).not.toBeNull();
    expect(document.getElementById("style2")).toBeNull();
  });

  test("removes all styles if fileNames is null", () => {
    const style1 = document.createElement("style");
    style1.id = "style1";
    style1.setAttribute("parent1", "⚡");
    document.head.appendChild(style1);

    const style2 = document.createElement("style");
    style2.id = "style2";
    style2.setAttribute("parent1", "⚡");
    document.head.appendChild(style2);

    clearStyles({ parent: "parent1", fileNames: null });

    expect(document.getElementById("style1")).toBeNull();
    expect(document.getElementById("style2")).toBeNull();
  });

  test("does nothing if no matching styles are found", () => {
    const style1 = document.createElement("style");
    style1.id = "style1";
    style1.setAttribute("parent2", "⚡");
    document.head.appendChild(style1);

    clearStyles({ parent: "parent1", fileNames: ["style1"] });

    expect(document.getElementById("style1")).not.toBeNull();
  });
});
