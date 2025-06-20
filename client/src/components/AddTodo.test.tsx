import { render, screen, fireEvent } from "@testing-library/react";
import AddTodo from "./AddTodo";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("AddTodo Component", () => {
  it("renders the 'ADD TODO' button", () => {
    render(<AddTodo mutate={async () => undefined} />);
    const addButton = screen.getByText(/ADD TODO/i);
    expect(addButton).toBeInTheDocument();
  });

  it("opens the modal when clicking 'ADD TODO' button", () => {
    render(<AddTodo mutate={async () => undefined} />);
    fireEvent.click(screen.getByText(/ADD TODO/i));

    const createTodoText = screen.getAllByText(/Create todo/i);
    expect(createTodoText[0]).toBeInTheDocument();
  });

  it("allows entering todo title and body", () => {
    render(<AddTodo mutate={async () => undefined} />);
    fireEvent.click(screen.getByText(/ADD TODO/i));

    fireEvent.change(screen.getByPlaceholderText("What do you want to do?"), {
      target: { value: "New Todo" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tell me more..."), {
      target: { value: "This is a test" },
    });

    expect(
      (
        screen.getByPlaceholderText(
          "What do you want to do?",
        ) as HTMLInputElement
      ).value,
    ).toBe("New Todo");
    expect(
      (screen.getByPlaceholderText("Tell me more...") as HTMLTextAreaElement)
        .value,
    ).toBe("This is a test");
  });
});
