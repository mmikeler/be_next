import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

export const useStore = createWithEqualityFn((set, get, api) => ({

  // Set like for page

}), shallow)