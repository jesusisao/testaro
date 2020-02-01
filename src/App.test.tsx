// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const title = getByText(/Testaro/i);
  expect(title).toBeInTheDocument();
});
