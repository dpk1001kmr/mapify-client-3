import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "../pages/HomePage";
import { getData } from "../api/services/data.service";

// 👇 Mock DataTable (no need to render the full component)
vi.mock("../components/DataTable", () => ({
  default: ({ data }) => <div>Mock DataTable - Rows: {data?.length ?? 0}</div>,
}));

// 👇 Mock the getData API
vi.mock("../api/services/data.service", () => ({
  getData: vi.fn(),
}));

// 👇 Helper function to wrap with React Query Provider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("HomePage", () => {
  test("renders loading state", async () => {
    // Simulate a pending promise (never resolves)
    getData.mockImplementation(
      () => new Promise(() => {}) // never resolves
    );

    render(<HomePage />, { wrapper: createWrapper() });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", async () => {
    getData.mockRejectedValue(new Error("Failed to fetch"));

    render(<HomePage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Error...")).toBeInTheDocument();
    });
  });

  test("renders data table when data is loaded", async () => {
    const mockData = [
      { id: 1, name: "Row 1" },
      { id: 2, name: "Row 2" },
    ];
    getData.mockResolvedValue(mockData);

    render(<HomePage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Uploaded Data →")).toBeInTheDocument();
      expect(screen.getByText("Mock DataTable - Rows: 2")).toBeInTheDocument();
    });
  });
});
