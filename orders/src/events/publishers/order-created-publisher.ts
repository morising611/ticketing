import { Publisher, OrderCreatedEvent, Subjects } from '@moriticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
