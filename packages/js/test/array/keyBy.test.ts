import { keyBy } from "../../src/array/keyBy";

describe("keyBy", () => {
	it("indexes items into a Map by the returned key", () => {
		const users = [
			{ id: 1, name: "Ana" },
			{ id: 2, name: "Beto" },
		];
		const byId = keyBy(users, (user) => user.id);
		expect(byId.get(1)).toEqual({ id: 1, name: "Ana" });
		expect(byId.get(2)).toEqual({ id: 2, name: "Beto" });
	});

	it("keeps the last item when keys collide", () => {
		const items = [
			{ id: 1, v: "a" },
			{ id: 1, v: "b" },
		];
		const byId = keyBy(items, (item) => item.id);
		expect(byId.get(1)).toEqual({ id: 1, v: "b" });
		expect(byId.size).toBe(1);
	});

	it("passes the index to the key function", () => {
		const result = keyBy(["a", "b"], (_, index) => index);
		expect([...result.keys()]).toEqual([0, 1]);
	});

	it("returns an empty Map for an empty array", () => {
		expect(keyBy([], (item) => item).size).toBe(0);
	});
});
