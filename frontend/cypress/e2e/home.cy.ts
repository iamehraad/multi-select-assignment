import { getElementWithDataTestId } from "../utils/helpers";
import { apiUrls } from "../../src/data/urls";

describe("Multi select product", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(getElementWithDataTestId("multi-select-products-title")).contains(
      "Productgroep",
    );
    cy.wait(1000);
  });

  it("user can see all components", () => {
    cy.get(getElementWithDataTestId("search-input"))
      .invoke("attr", "placeholder")
      .should("equal", "Zoek op ...");
    cy.get(getElementWithDataTestId("product-list"));
    cy.get(getElementWithDataTestId("common-button-clear")).contains(
      "Toepassen / Clear",
    );
  });

  it("user can search, list get filtered and clear button clears filtration", () => {
    cy.get(getElementWithDataTestId("search-input")).type("Thriller");
    cy.get(getElementWithDataTestId("search-input")).should("have.value", "Thriller");
    cy.wait(500);
    cy.get(getElementWithDataTestId("product-list-item")).should(
      "have.length",
      1,
    );
    cy.get(getElementWithDataTestId("common-button-clear")).click();
    cy.get(getElementWithDataTestId("search-input")).should("have.value", "");
    cy.get(getElementWithDataTestId("product-list-item")).should(
        "have.length.at.least",
        5,
    );
  });

  it("user can see error message when search criteria matches nothing", () => {
    cy.get(getElementWithDataTestId("search-input")).type(
      "Something that doesnt exist",
    );
    cy.wait(500);
    cy.get(getElementWithDataTestId("product-list-item")).should(
      "have.length",
      0,
    );
    cy.get(getElementWithDataTestId("product-list-no-item-text")).contains(
      "No item to be selected",
    );
  });

  it("user can select multiple items and upon refresh selection remains and clear button will clear selection", () => {
    cy.get(getElementWithDataTestId("product-list-item")).first().click();
    cy.get(getElementWithDataTestId("product-list-item")).eq(1).click();
    cy.get(getElementWithDataTestId("product-list-item-checkbox"))
      .first()
      .should("be.checked");
    cy.get(getElementWithDataTestId("product-list-item-checkbox"))
      .eq(1)
      .should("be.checked");
    cy.reload();
    cy.wait(1000);
    cy.get(getElementWithDataTestId("product-list-item-checkbox"))
      .first()
      .should("be.checked");
    cy.get(getElementWithDataTestId("product-list-item-checkbox"))
      .eq(1)
      .should("be.checked");
    cy.get(getElementWithDataTestId("common-button-clear")).click();
    cy.wait(500);
    cy.get(getElementWithDataTestId("product-list-item-checkbox"))
        .first()
        .should("not.be.checked");
    cy.get(getElementWithDataTestId("product-list-item-checkbox"))
        .eq(1)
        .should("not.be.checked");
  });

  it("user can see error message when fetching products fails", () => {
    cy.intercept("GET", apiUrls.productsList, { statusCode: 400, body: {} }).as(
      "blockedRequest",
    );
    cy.reload();
    cy.get(getElementWithDataTestId("common-button-retry")).contains(
      "Request failed with status code 400. Retry fetching data",
    );
  });
});
