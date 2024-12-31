import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@moriticket/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
