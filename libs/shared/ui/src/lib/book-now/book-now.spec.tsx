import { render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";

import BookNow from "./book-now";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str: string, config: unknown): string | Array<string> =>
  config ? ["dummy phone"] : str
);
const useTranslationSpy = useTranslation as jest.Mock;

useTranslationSpy.mockReturnValue({
  t: tSpy,
});

describe("BookNow", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<BookNow />);
    expect(baseElement).toBeTruthy();
    expect(screen.findByText("bookNow.from")).toBeTruthy();
    expect(screen.findByText("bookNow.perPerson")).toBeTruthy();
  });
});
