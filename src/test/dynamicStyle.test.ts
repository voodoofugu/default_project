import { clearStyles } from "../components/hooks/useDynamicStyle";

describe("useDynamicStyle test", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  test("removes styles with matching ids", () => {
    const style1 = document.createElement("style");
    style1.id = "style1";
    style1.setAttribute("id", "⚡");
    document.head.appendChild(style1);

    const style2 = document.createElement("style");
    style2.id = "style2";
    style2.setAttribute("id", "⚡");
    document.head.appendChild(style2);

    const style3 = document.createElement("style");
    style3.id = "style3";
    style3.setAttribute("id", "⚡");
    document.head.appendChild(style3);

    clearStyles({ id: "id", fileNames: ["style1", "style3"] });

    expect(document.getElementById("style1")).toBeNull();
    expect(document.getElementById("style2")).not.toBeNull();
    expect(document.getElementById("style3")).toBeNull();
  });

  test("does not remove styles with non-matching ids", () => {
    const style1 = document.createElement("style");
    style1.id = "style1";
    style1.setAttribute("id", "⚡");
    document.head.appendChild(style1);

    const style2 = document.createElement("style");
    style2.id = "style2";
    style2.setAttribute("id", "⚡");
    document.head.appendChild(style2);

    clearStyles({ id: "id", fileNames: ["style3"] });

    expect(document.getElementById("style1")).not.toBeNull();
    expect(document.getElementById("style2")).not.toBeNull();
  });
});
