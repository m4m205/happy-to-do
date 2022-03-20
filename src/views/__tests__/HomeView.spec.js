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

    it("should call router when API send a rejected value", async () => {
        const spy = vi.spyOn(NiveaubepalingAPI, 'getLists').mockRejectedValue({})
        const routerSpy = vi.spyOn(router, 'push')
        const wrapper = mount(HomeView)
        await flushPromises()

        expect(routerSpy).toHaveBeenCalledWith({ name: "error" })
    })

    it("should set response to listData when API send a resolve value", async () => {
        const listsDataResponse = {
            data: [{
                "id":123,
                "name":"Test"
            }]
        }
        const spyGetItems = vi.spyOn(NiveaubepalingAPI, 'getItems').mockRejectedValue({})
        const spyGetLists = vi.spyOn(NiveaubepalingAPI, 'getLists').mockResolvedValue({
            json: () => new Promise((res) => {
                res(listsDataResponse)
            })
        })
        const wrapper = mount(HomeView)
        expect(wrapper.vm.listsData).toEqual([])
        await flushPromises()

        expect(wrapper.vm.listsData).toEqual([{ id:123, name:"Test" }])
    })

    it("should call getListItems with the passed argument when API send a resolve value", async () => {
        // const listsDataResponse = {
        //     data: [{
        //         "id":123,
        //         "name":"Test"
        //     }]
        // }
        // // vi.useFakeTimers()
        // const spyGetItems = vi.spyOn(NiveaubepalingAPI, 'getItems').mockResolvedValue({})
        // const spyGetLists = vi.spyOn(NiveaubepalingAPI, 'getLists').mockResolvedValue({
        //     json: () => new Promise((res) => {
        //         res(listsDataResponse)
        //     })
        // })
        // const wrapper = mount(HomeView)
        // // await flushPromises()
        // // vi.runAllTicks()
        // await flushPromises()
        // const spy = vi.spyOn(wrapper.vm, 'getListItems').mockImplementation(() => {})
        // wrapper.vm.getLists(321)
        // await flushPromises()

        // await expect(spy).toHaveBeenCalled()
    })
})