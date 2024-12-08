import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@moriticket/common/build';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
