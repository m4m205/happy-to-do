import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ItemComponent from "../ItemComponent.vue";

describe("HomeView", () => {
  it("renders properly", () => {
    const wrapper = mount(ItemComponent,
        { props: {
             item: {
                 id: 123,
                 name: 'some item name',
                 completed: true
             } } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});