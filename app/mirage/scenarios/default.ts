import type { Server } from 'miragejs';

export default function (server: Server): void {
  server.createList('subscription', 10);
}
