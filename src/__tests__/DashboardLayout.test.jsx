import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom/vitest";
import DashboardLayout from "../pages/DashboardLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// 👇 Import your actual reducers or mock one
import uploadReducer from "../features/upload/uploadSlice";

const queryClient = new QueryClient();
const store = configureStore({
  reducer: {
    upload: uploadReducer,
  },
});

describe("DashboardLayout", () => {
  test("toggles the sidebar when the menu button is clicked", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DashboardLayout>
            <div>Child Content</div>
          </DashboardLayout>
        </QueryClientProvider>
      </Provider>
    );

    // Sidebar should be visible initially
    expect(screen.getByText("Mapify")).toBeInTheDocument();

    // Click toggle button → hide sidebar
    const toggleBtn = screen.getByTestId("toggle-sidebar-button");
    fireEvent.click(toggleBtn);

    expect(screen.queryByText("Mapify")).not.toBeInTheDocument();

    // Click again → show sidebar
    fireEvent.click(toggleBtn);
    expect(screen.getByText("Mapify")).toBeInTheDocument();
  });
});
