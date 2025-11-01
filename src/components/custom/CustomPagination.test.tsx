import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type React from "react";
import type { PropsWithChildren } from "react";

//**Evitar tanto ruido de los componentes cuando hacemos el render */
vi.mock("../ui/button", () => ({
	Button: ({ children, ...props }: PropsWithChildren) => (
		<button {...props}>{children}</button>
	),
}));

/**Preparación para el ambiente de renderización */
// const renderWithRouter = (component: JSX.Element) => { -> Puede ser JSX.Element ó React.ReactElement
const renderWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[]
) => {
	return render(<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>);
};

describe("should render component with default values", () => {
	test("should render component with default values", () => {
		renderWithRouter(<CustomPagination totalPages={5} />); // Este componente puede hacer de children renderWithRouter
		// screen.debug();
		expect(screen.getByText("Anterior")).toBeDefined();
		expect(screen.getByText("Siguiente")).toBeDefined();
		expect(screen.getByText("1")).toBeDefined();
		expect(screen.getByText("5")).toBeDefined();
	});
  test("should disable previous button when page is 1", () => {
    renderWithRouter(<CustomPagination totalPages={5} />);
    const previousButton = screen.getByText("Anterior");
    screen.debug(previousButton);
    // console.log(previousButton.getAttributeNames()); // es un array con los atributos
    expect(previousButton.getAttributeNames()).toContain("disabled");
  })

  test("should disable next button when we are in the last page", () => {
    //? Cambio de query params para que pase a ser la ultima pagina ( lo hacemos en em memory router)
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=5"]);
    const previousButton = screen.getByText("Siguiente");
    // screen.debug(previousButton);
    expect(previousButton.getAttributeNames()).toContain("disabled");
  })

  test("should disable 3 button when we are in page 3", () => {
    //? Cambio de query params para que pase a ser la ultima pagina ( lo hacemos en em memory router)
    renderWithRouter(<CustomPagination totalPages={10} />, ["/?page=3"]);
    const button2 = screen.getByText("2");
    const button3 = screen.getByText("3");
    screen.debug(button3);
    expect(button2.getAttribute('variant')).toBe("outline");// outlined indica que no es el botón por defecto
    expect(button3.getAttribute('variant')).toBe("default");// default indica que es el botón por defecto
  })

  test("should change page when click on number button", () => {
    // Indicamos nuestro sujeto de prueba
    renderWithRouter(<CustomPagination totalPages={5} />, ["/?page=3"]);

    const button2 = screen.getByText("2");
    const button3 = screen.getByText("3");
    expect(button2.getAttribute('variant')).toBe("outline");
    expect(button3.getAttribute('variant')).toBe("default");
    screen.debug();
    fireEvent.click(button2);
    expect(button2.getAttribute('variant')).toBe("default");
    expect(button3.getAttribute('variant')).toBe("outline");
    
  });


});