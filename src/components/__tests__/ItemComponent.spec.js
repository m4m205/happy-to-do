import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ItemComponent from "../ItemComponent.vue";

describe("ItemComponent elements", () => {
  it("renders properly", () => {
    const wrapper = mount(ItemComponent, {
      props: {
        item: {
          id: 123,
          name: "some item name",
          completed: true,
        },
      },
    });

    const checkboxInput = wrapper.find('input[type="checkbox"]');
    const textInput = wrapper.find('input[type="text"]');

    expect(wrapper.findAll("i").length).toBe(3);
    expect(wrapper.findAll("i")[0].classes()).toContain(
      "bi-check-circle-fill",
      "text-success"
    );
    expect(wrapper.findAll("i")[1].classes()).toContain(
      "bi-trash3-fill",
      "text-danger"
    );
    expect(wrapper.findAll("i")[2].classes()).toContain(
      "bi-info-circle",
      "text-info"
    );
    expect(checkboxInput.element.checked).toBeTruthy();
    expect(textInput.element.value).toBe("some item name");
  });

  it("emit correct events names", async () => {
    const wrapper = mount(ItemComponent, {
      props: {
        item: {
          id: 123,
          name: "some item name",
          completed: true,
        },
        key: 123,
      },
    });

    const checkboxInput = wrapper.find('input[type="checkbox"]');
    const textInput = wrapper.find('input[type="text"]');

    textInput.setValue("some new item");
    checkboxInput.setValue(false);
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().inputValue[0][0]).toEqual("some new item");
    expect(wrapper.emitted("update:itemCompleted")[0][0]).toEqual(false);
  });
});
