import { render, screen } from "@testing-library/react";
import FrequentlyAsked from "./frequently-asked";
import { useTranslation } from "react-i18next";
import { questionsList as mockedQuestionsList } from "@visit/ecomm-lib/shared/data-access";

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

describe("FrequentlyAsked", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<FrequentlyAsked questionsList={mockedQuestionsList} />);
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText("helpCenter.askedQuestions")).toBeTruthy();
    expect(screen.queryByText("helpCenter.title")).toBeTruthy();
    expect(screen.queryByText("helpCenter.subTitle")).toBeTruthy();
  });
});
