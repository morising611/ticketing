import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@moriticket/common/build';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
