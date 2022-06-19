import { beforeEach, describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import router from "@/router";
import HomeView from "../HomeView.vue";
import NiveaubepalingAPI from "@/services/niveaubepalingAPI.js";

describe("getLists method", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call NiveaubepalingAPI.getLists", () => {
    const spy = vi.spyOn(NiveaubepalingAPI, "getLists").mockRejectedValue({});
    mount(HomeView);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should call router when API send a rejected value", async () => {
    vi.spyOn(NiveaubepalingAPI, "getLists").mockRejectedValue({});
    const routerSpy = vi.spyOn(router, "push");
    mount(HomeView);
    await flushPromises();

    expect(routerSpy).toHaveBeenCalledWith({ name: "error" });
  });

  it("should set response to listData when API send a resolved value", async () => {
    const listsDataResponse = {
      data: [
        {
          id: 123,
          name: "Test",
        },
      ],
    };
    vi.spyOn(NiveaubepalingAPI, "getItems").mockRejectedValue({});
    vi.spyOn(NiveaubepalingAPI, "getLists").mockResolvedValue({
      json: () =>
        new Promise((res) => {
          res(listsDataResponse);
        }),
    });
    const wrapper = mount(HomeView);
    expect(wrapper.vm.listsData).toEqual([]);
    await flushPromises();

    expect(wrapper.vm.listsData).toEqual([{ id: 123, name: "Test" }]);
  });

  it("should call getListItems with the passed argument when API send a resolved value",
    async () => {
      const listsDataResponse = {
        data: [
          {
            id: 123,
            name: "Test",
          },
        ],
      };
      const itemsDataResponse = {
        data: {
          items: [],
        },
      };
      vi.spyOn(NiveaubepalingAPI, "getItems").mockResolvedValue({
        json: () =>
          new Promise((res) => {
            res(itemsDataResponse);
          }),
      });
      vi.spyOn(NiveaubepalingAPI, "getLists").mockResolvedValue({
        json: () =>
          new Promise((res) => {
            res(listsDataResponse);
          }),
      });
      const wrapper = mount(HomeView);
      const spy = vi.spyOn(wrapper.vm.obj, "getListItems");
      await wrapper.vm.getLists(321);
      await flushPromises();

      expect(spy).toHaveBeenCalledWith(321);
    }
  );
});
