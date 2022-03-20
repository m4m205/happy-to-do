import { afterEach, describe, it, expect, vi } from "vitest";
import { mount, RouterLinkStub, flushPromises } from "@vue/test-utils";
import router from "@/router";
import HomeView from "../HomeView.vue";
import NiveaubepalingAPI from "@/services/niveaubepalingAPI.js";

describe("HomeView elements", () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it("should call getLists method on first load", async () => {
        // const APIspy = vi.spyOn(NiveaubepalingAPI, 'getLists').mockRejectedValue({})
        // const wrapper = mount(HomeView)
        // const spy = vi.spyOn(wrapper.vm, 'getLists')
        // await flushPromises()

        // expect(spy).toHaveBeenCalledTimes(1)
    })
})
// const listInput = wrapper.find('#new-list-input')

describe("getLists method", () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it("should call NiveaubepalingAPI.getLists on first", () => {
        const spy = vi.spyOn(NiveaubepalingAPI, 'getLists').mockRejectedValue({})
        const wrapper = mount(HomeView)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    it("rout to error page if API send a rejected value", async () => {
        const spy = vi.spyOn(NiveaubepalingAPI, 'getLists').mockRejectedValue({})
        const routerSpy = vi.spyOn(router, 'push')
        const wrapper = mount(HomeView)
          await flushPromises()
          expect(routerSpy).toHaveBeenCalledTimes(1)
    })
})