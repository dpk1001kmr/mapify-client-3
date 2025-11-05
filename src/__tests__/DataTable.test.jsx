import { render, screen, within } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import DataTable from "../components/DataTable";

describe("DataTable", () => {
  test("does not render table when data is empty", () => {
    render(<DataTable data={[]} />);
    const table = screen.queryByRole("table");
    expect(table).not.toBeInTheDocument();
  });

  test("renders table with headers and data rows", () => {
    const mockData = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        jobTitle: "Developer",
        department: "Engineering",
        company: "TechCorp",
        street: "123 Main St",
        zipCode: "12345",
        city: "NYC",
        country: "USA",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "0987654321",
        jobTitle: "Designer",
        department: "Design",
        company: "CreativeInc",
        street: "456 Park Ave",
        zipCode: "67890",
        city: "LA",
        country: "USA",
      },
    ];

    render(<DataTable data={mockData} />);

    // ✅ Table should exist
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // ✅ Check header columns
    const headerRow = table.querySelector("tr");
    expect(within(headerRow).getByText("#")).toBeInTheDocument();
    expect(within(headerRow).getByText("First Name")).toBeInTheDocument();
    expect(within(headerRow).getByText("Email")).toBeInTheDocument();

    // ✅ Check first data row
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();

    // ✅ Check second data row
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();

    // ✅ Should render the correct number of rows (1 header + 2 data)
    const rows = table.querySelectorAll("tr");
    expect(rows.length).toBe(3);
  });
});
