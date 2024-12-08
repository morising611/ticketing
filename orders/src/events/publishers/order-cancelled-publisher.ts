import { Publisher, OrderCancelledEvent, Subjects } from '@moriticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
