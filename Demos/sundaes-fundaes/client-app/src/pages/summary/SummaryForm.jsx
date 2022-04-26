import React from "react";
import { Form, Button, Popover, OverlayTrigger } from "react-bootstrap";

export default function SummaryForm() {
  const [agreeTermsConditions, setAgreeTermsConditions] = React.useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Please note, no ice cream will actually be delivered.
      </Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <OverlayTrigger placement="right" overlay={popover}>
      <span>
        I agree to the{" "}
        <span style={{ color: "blue" }}> Terms and Conditions</span>{" "}
      </span>
    </OverlayTrigger>
  );

  return (
    <>
      <h2>Order Summary</h2>
      <Form>
        <Form.Group className="mb-3" controlId="scoopsRadioButton">
          <Form.Label as="h3">Scoops: £4</Form.Label>
          <Form.Check type="radio" label="3 Vanilla" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="toppingsRadioButton">
          <Form.Label as="h3">Toppings: £2</Form.Label>
          <Form.Check type="radio" label="Brownie chunks" />
          <Form.Check type="radio" label="Hot fudge" />
          <Form.Check type="radio" label="Pistachios" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="totalCost">
          <Form.Label as="h3">Total: £6</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="termsAndConditions">
          <Form.Check
            type="checkbox"
            label={checkboxLabel}
            checked={agreeTermsConditions}
            onChange={() => setAgreeTermsConditions(!agreeTermsConditions)}
          ></Form.Check>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!agreeTermsConditions}
        >
          Confirm Order
        </Button>
      </Form>
    </>
  );
}
