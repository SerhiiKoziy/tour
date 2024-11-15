import { render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import HaveQuestionWrapper from "./have-question";

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

describe("HaveQuestionWrapper", () => {
  it("should render successfully", () => {
    const button = screen.findByRole("button");
    const textarea = screen.findAllByPlaceholderText(/i want to ask.../i);
    const { baseElement } = render(<HaveQuestionWrapper />);

    expect(baseElement).toBeTruthy();
    expect(screen.queryByText("haveQuestion.stillHave")).toBeTruthy();
    expect(screen.queryByText("haveQuestion.sendMessage")).toBeTruthy();
    expect(button).toBeTruthy();
    expect(textarea).toBeTruthy();
  });
});
