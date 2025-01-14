import React from "react";
import {Router} from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import {render, cleanup} from "@testing-library/react";
import Nav from "../components/Nav";
import {axe, toHaveNoViolations} from "jest-axe";
expect.extend(toHaveNoViolations);

jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useHistory: jest.fn(),
  };
});

// TODO: Skipped until React.Suspense + zeit/swr is testable 
// https://github.com/open-sauced/open-sauced/discussions/408
test.skip("container component should have no violations", async () => {
  const history = createMemoryHistory();
  const {container} = render(<Nav />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();

  cleanup();
});

test.skip('renders a "Login" link', () => {
  const {getByText} = render(<Nav />);
  const link = getByText("Login");
  expect(link).toHaveAttribute("alt");
});

test.skip('renders a "Logout" link with user present', () => {
  const {getByText} = render(<Nav user={{login: "me"}} />);
  const link = getByText("Logout");
  expect(link).toHaveAttribute("alt");
});
