import { storyAt, type Story } from "./story";

/** Per-frame story state written by the single stepper, read by scene parts. */
export const live: { story: Story; uw: number; time: number } = {
  story: storyAt(0, 0),
  uw: 0,
  time: 0,
};
