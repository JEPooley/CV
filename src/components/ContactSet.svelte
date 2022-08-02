<script>
  // Imports
  import { contacts } from "../data/contacts.js";
  import Contact from "./Contact.svelte"
</script>

{#each contacts as contact}
  <Contact
    name={contact.name}
    icon={contact.icon}
    href={contact.href}
    >{contact.text}
  </Contact>
{/each}
