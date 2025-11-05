import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { useSelector } from "react-redux";
import UploadPage from "../pages/UploadPage";

// 👇 Mock all child components to simplify test (so you don’t need real implementations)
vi.mock("../components/UploadForm", () => ({
  default: () => <div>Mock UploadForm</div>,
}));
vi.mock("../components/ShowMappingSuccess", () => ({
  default: () => <div>Mock ShowMappingSuccess</div>,
}));
vi.mock("../components/ShowInvalidNumberOfColumnsError", () => ({
  default: () => <div>Mock ShowInvalidNumberOfColumnsError</div>,
}));
vi.mock("../components/ShowMissingMandatoryColumnsError", () => ({
  default: () => <div>Mock ShowMissingMandatoryColumnsError</div>,
}));
vi.mock("../components/ShowMappingError", () => ({
  default: () => <div>Mock ShowMappingError</div>,
}));
vi.mock("../components/CancelOrSave", () => ({
  default: () => <div>Mock CancelOrSave</div>,
}));
vi.mock("../components/SaveMappingSuccess", () => ({
  default: () => <div>Mock SaveMappingSuccess</div>,
}));
vi.mock("../components/SaveMappingError", () => ({
  default: () => <div>Mock SaveMappingError</div>,
}));
vi.mock("../components/ShowSavedDataSummary", () => ({
  default: () => <div>Mock ShowSavedDataSummary</div>,
}));

// 👇 Mock react-redux useSelector
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

describe("UploadPage", () => {
  test("renders base UploadForm always", () => {
    useSelector.mockReturnValue({
      isMappingSuccess: false,
      isInvalidNumberOfColumnsError: false,
      isMissingMandatoryColumnsError: false,
      isMappingError: false,
      showCancelOrSave: false,
      savedDataSummary: null,
    });

    render(<UploadPage />);

    expect(screen.getByText("Mock UploadForm")).toBeInTheDocument();
  });

  test("renders success and error components based on Redux state", () => {
    useSelector.mockReturnValue({
      isMappingSuccess: true,
      isInvalidNumberOfColumnsError: true,
      isMissingMandatoryColumnsError: true,
      isMappingError: true,
      showCancelOrSave: true,
      savedDataSummary: { data: "mockData" },
    });

    render(<UploadPage />);

    // These should render based on flags
    expect(screen.getByText("Mock ShowMappingSuccess")).toBeInTheDocument();
    expect(
      screen.getByText("Mock ShowInvalidNumberOfColumnsError")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mock ShowMissingMandatoryColumnsError")
    ).toBeInTheDocument();
    expect(screen.getByText("Mock ShowMappingError")).toBeInTheDocument();
    expect(screen.getByText("Mock SaveMappingSuccess")).toBeInTheDocument();
    expect(screen.getByText("Mock SaveMappingError")).toBeInTheDocument();
    expect(screen.getByText("Mock ShowSavedDataSummary")).toBeInTheDocument();
  });
});
