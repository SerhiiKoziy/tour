import { render, screen } from "@testing-library/react";
import PurchaseTravelInsurance from "./purchase-travel-insurance";
import { useTranslation } from "react-i18next";

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

describe("PurchaseTravelInsurance", () => {

  it("should render successfully", () => {
    const { baseElement } = render(<PurchaseTravelInsurance />);
    expect(baseElement).toBeTruthy();

    expect(screen.queryByText("travelInsurance.title")).toBeTruthy();
    expect(screen.queryByText("travelInsurance.description")).toBeTruthy();
  });
});
