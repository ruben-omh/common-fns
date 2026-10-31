import { escapeHtml } from "../../src/string/escapeHtml";

describe("escapeHtml", () => {
	it("escapes all five HTML-special characters", () => {
		expect(escapeHtml('Tom & "Jerry" <br>')).toBe("Tom &amp; &quot;Jerry&quot; &lt;br&gt;");
	});

	it("escapes a single quote", () => {
		expect(escapeHtml("it's")).toBe("it&#39;s");
	});

	it("returns text with nothing to escape unchanged", () => {
		const text = "plain text";
		expect(escapeHtml(text)).toBe(text);
	});

	it("returns an empty string unchanged", () => {
		expect(escapeHtml("")).toBe("");
	});
});
