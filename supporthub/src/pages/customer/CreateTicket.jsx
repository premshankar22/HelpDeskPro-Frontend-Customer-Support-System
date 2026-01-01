import CreateTicketContainer from "./CreateTicketContainer";
import CreateTicketView from "./CreateTicketView";

export default function CreateTicket() {
  return (
    <CreateTicketContainer>
      {(props) => <CreateTicketView {...props} />}
    </CreateTicketContainer>
  );
}
