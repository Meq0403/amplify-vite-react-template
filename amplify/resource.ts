import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: 'birdapp_storage',
  access: allow => ({
    'room/*': [
      allow.guest.to(['get']),
      allow.authenticated.to(['get', 'write', 'delete'])
    ]
  })
})